const express = require('express');
const bcrypt = require('bcryptjs')
const db = require('../db/models')
const { Task, User, Category } = db;
const { check, validationResult } = require('express-validator');
// const { csrfProtection, asyncHandler } = require('./utils')
const { loginUser, logoutUser } = require('../auth')
const csrf = require('csurf');

const csrfProtection = csrf({ cookie: true });

const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

const router = express.Router();

/* GET users listing. */
router.get('/register', csrfProtection, (req, res,) => {

  if (req.session.auth) {
    res.redirect('/tasks')
  }

  const user = db.User.build();
  res.render("register", {
    title: 'Register',
    user,
    csrfToken: req.csrfToken()
  })
});

const userValidators = [
  check('username')
    .exists({ checkFalsy: true })
    .withMessage("Please enter a Username, jabroni")
    .isLength({ max: 50 })
    .withMessage('Chillll- Username must not be more than 50 characters long')
    .custom((value) => {
      return db.User.findOne({ where: { username: value } })
        .then((user) => {
          if (user) {
            return Promise.reject("Username already in use. Step your game up.")
          }
        })
    }),
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('Please enter a first name, stranger.')
    .isLength({ max: 50 })
    .withMessage('Beautiful name! However, first name cannot be more than 50 characters long.'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Please enter a last name, stranger.')
    .isLength({ max: 50 })
    .withMessage('Beautiful name! However, last name cannot be more than 50 characters long.'),
  check('email')
    .exists({ checkFalsy: true })
    .withMessage('Please enter a valid email address')
    .custom((value) => {
      return db.User.findOne({ where: { email: value } })
        .then((user) => {
          if (user) {
            return Promise.reject('The provided email address is already in use by another account');
          }
        });
    }),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Before bulking up, you must enter a password')
    .isLength({ max: 50 })
    .withMessage('Impressive, but password must not be more than 50 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
    .withMessage('Password needs protein! Must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'),
  check('confirmPassword')
    .exists({ checkFalsy: true })
    .withMessage('Please confirm password')
    .isLength({ max: 50 })
    .withMessage('Confirm Password must not be more than 50 characters long')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Confirmed password does not match password');
      }
      return true;
    }),
]

router.post('/register', csrfProtection, userValidators, asyncHandler(async (req, res, next) => {
  if (req.session.auth) {
    res.redirect('/tasks')
  }

  const { username, firstName, lastName, email, password } = req.body

  const user = db.User.build({
    username,
    email,
    firstName,
    lastName
  })

  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {
    const hashedPassword = await bcrypt.hash(password, 12)
    user.hashedPassword = hashedPassword;
    await user.save();
    loginUser(req, res, user)
    res.redirect('/tasks')
  } else {
    const errors = validatorErrors.array().map((error) => error.msg)
    res.render('register', {
      title: "Register",
      user,
      errors,
      csrfToken: req.csrfToken(),
    })
  }


}));

const loginValidators = [
  check('email')
    .exists({ checkFalsy: true })
    .withMessage('Please enter email'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please enter password')
];

router.get('/login', csrfProtection, (req, res) => {

  if (req.session.auth) {
    res.redirect('/tasks')
  }

  res.render('login', {
    title: "Login",
    csrfToken: req.csrfToken(),
  })
})

router.post('/login', csrfProtection, loginValidators, asyncHandler(async (req, res) => {

  const { email, password } = req.body

  let errors = [];

  const validatorErrors = validationResult(req)

  if (validatorErrors.isEmpty()) {

    const user = await db.User.findOne({ where: { email } })
    if (user) {

      const passwordMatch = await bcrypt.compare(password, user.hashedPassword.toString())
      if (passwordMatch) {
        loginUser(req, res, user)
        return res.redirect('/tasks')
      }

    }
    errors.push("Login failed for the provided email address and password");

  } else {
    errors = validatorErrors.array().map((error) => error.msg)
  }
  res.render('login', {
    title: 'Login',
    email,
    errors,
    csrfToken: req.csrfToken()
  })
}))

router.get('/logout', asyncHandler(async (req, res) => {
  if (req.session.auth) {

    if (req.session.auth.firstName === 'demoFirstName5252') {
      // logoutUser(req, res)
      const user = await User.findByPk(req.session.auth.userId)
      const tasks = await Task.findAll({
        where: {
          userId: req.session.auth.userId
        }
      })
      const categories = await Category.findAll({
        where: {
          userId: req.session.auth.userId
        }
      })

      await tasks.forEach(task => {
        task.destroy()
      })
      // await tasks.destroy()
      // await categories.destroy()
      await categories.forEach(category => {
        category.destroy()
      })
      await user.destroy()

      // const user = db.User
    }

    logoutUser(req, res)
    // res.redirect('/users/login')
    req.session.save(() => res.redirect("/users/login"))

  }
  // res.redirect('/users/login')
  req.session.save(() => res.redirect("/users/login"))

}))


router.get('/demo', asyncHandler(async (req, res) => {
  if (req.session.auth) {
    // res.redirect('/tasks')
  }
  let random = Math.floor(Math.random() * 5000)
  const user = db.User.build({
    username: `DemoUser${random}`,
    email: `demo${random}@demoUser.com`,
    firstName: "demoFirstName5252",
    lastName: "demoLastName",
    hashedPassword: "Password123!"
  })


  if (user) {
    await user.save();
    loginUser(req, res, user)
    res.redirect('/tasks')
  }

}))




module.exports = router;
