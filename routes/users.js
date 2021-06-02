const express = require('express');
const bcrypt = require('bcryptjs')
const db = require('../db/models')
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
  res.render("testUserRegister", {
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
  // console.log(req.body)

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
    res.render('testUserRegister', {
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

  res.render('testUserLogin', {
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
  res.render('testUserLogin', {
    title: 'Login',
    email,
    errors,
    csrfToken: req.csrfToken()
  })
}))

router.get('/logout', (req, res) => {
  logoutUser(req, res)
  res.redirect('users/login')
})



module.exports = router;
