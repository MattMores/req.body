const express = require("express");
const router = express.Router();
const { Category, Task } = require("../db/models");
const { check, validationResult } = require("express-validator");
const { asyncHandler, csrfProtection } = require("../utils");
const { requireAuth } = require("../auth");

const catNotFoundError = (id) => {
  const err = Error(`Category ${id} not found`);
  err.title = "Category not found";
  err.status = 404;
  return err;
};

const categoryValidators = [
  check("title")
    .exists({ checkFalsy: true })
    .withMessage("Enter a category")
    .isLength({ max: 50 })
    .withMessage("Category title must be less than 50 characters!")
    .custom((value) => {
      let emptyString = "  ";
      if (value.trim() === emptyString.trim()) {
        throw new Error("Category cannot be empty space");
      }
      return true;
    }),
];

router.get(
  "/create",
  requireAuth,
  csrfProtection,
  asyncHandler(async (req, res) => {
    const category = Category.build();
    res.render("addCategory", {
      title: "Add Category:",
      category,
      csrfToken: req.csrfToken(),
    });
  })
);

router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const category = await Category.findAll();
    res.json({ category });
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const { userId } = req.session.auth;
    const id = req.params.id;
    const categories = await Category.findAll({
      where: {
        userId: userId,
      },
      include: Task,
    });
    const category = await Category.findByPk(id);

    const incompleteTasks = await Task.findAll({
      where: {
        categoryId: id,
        userId: userId,
        completed: "false",
      },
      include: Category,
    });

    const completedTasks = await Task.findAll({
      where: {
        categoryId: id,
        userId: userId,
        completed: "true",
      },
      include: Category,
    });

    if (category) {
      res.render("superTESTMYTASK", {
        categories,
        incompleteTasks,
        completedTasks,
        listTitle: `${category.title}`,
      });
    } else {
      next(catNotFoundError(id));
    }
  })
);

router.post(
  "/",
  csrfProtection,
  categoryValidators,
  asyncHandler(async (req, res, next) => {
    const { userId } = req.session.auth;
    const { title } = req.body;
    console.log('*****************where are we****************')
    let errors = [];
    const validatorErrors = validationResult(req);
    // let emptyString = '    '
    // if (title.trim() === emptyString.trim()) {

    //   const emptyStringError = new Error('Cannot add an empty category')
    // }
    const category = await Category.build({
      userId,
      title
    })
    console.log('*****************bap****************')

    if (validatorErrors.isEmpty()) {
      // await Category.create({ userId, title });
      await category.save()
      res.redirect("/tasks");
    } else {
      errors = validatorErrors.array().map((error) => error.msg);
      res.render("addCategory.pug", {
        title: "Add Category:",
        errors,
        csrfToken: req.csrfToken(),
      });
    }
    // res.json({ createCategory });
  })
);

router.put(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const findCat = await Category.findByPk(id);
    const { userId } = req.session.auth;
    const { title } = req.body;

    if (findCat) {
      const updateCat = await findCat.update({ title });
      res.json({ updateCat });
    } else {
      next(catNotFoundError(id));
    }
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const findCat = await Category.findByPk(id);

    if (findCat) {
      const deleteCat = await findCat.destroy();
      res.json({ deleteCat });
    } else {
      next(catNotFoundError(id));
    }
  })
);

// router.get('/create', requireAuth, asyncHandler(async (req, res) => {

//   const category = Category.build()
//   res.render("testAddCategory", {
//     title: "Add Category:",
//     category,
//     csrfToken: req.csrfToken()
//   })
// }))

router.post(
  "/api/create",
  requireAuth,
  asyncHandler(async (req, res) => {
    const category = Category.build({
      title: req.body.value,
      userId: res.locals.user.id,
    });
    if (category) {
      await category.save();
      const categories = await Category.findAll({
        where: {
          userId: res.locals.user.id,
        },
      });
      await res.json({ categories });
    }
  })
);
router.get(
  "/api/get",
  requireAuth,
  asyncHandler(async (req, res) => {
    const categories = await Category.findAll({
      where: {
        userId: res.locals.user.id,
      },
    });
    await res.json({ categories });
  })
);

router.delete('/api/delete/:id', requireAuth, asyncHandler(async (req, res) => {
  const id = req.params.id
  // console.log(typeof id)
  // const newId = parseInt(id, 10)
  // console.log(typeof newId)
  let category = await Category.findByPk(id)

  let tasks = await Task.findAll({
    where: {
      userId: res.locals.user.id,
      categoryId: id
    }
  })

  if (tasks) {

    await tasks.forEach(task => {
      task.update({
        categoryId: null
      })
      // task.categoryId = null;
    })
  }

  if (category) {
    const deleteCategory = await category.destroy();
    res.json({ deleteCategory });
  }

}))

module.exports = router;
