const express = require("express");
const router = express.Router();
const { Task, User, Category } = require("../db/models");
const { check, validationResult } = require("express-validator");
const { asyncHandler, csrfProtection } = require("../utils");
const { requireAuth } = require("../auth");
const taskNotFoundError = (id) => {
  const err = Error(`Task ${id} could not be found.`);
  err.title = `Task not found.`;
  err.status = 404;
  return err;
};
const taskValidators = [
  check("title")
    .exists({ checkFalsy: true })
    .withMessage("Enter task title")
    .isLength({ max: 50 })
    .withMessage(
      "Task title must be less than 50 characters! Save some for the details section!"
    )
    .custom((value) => {
      let emptyString = "  ";
      if (value.trim() === emptyString.trim()) {
        throw new Error("Title cannot be empty space");
      }
      return true;
    }),
];

router.get(
  "/create",
  csrfProtection,
  asyncHandler(async (req, res, next) => {
    // res.send('test')
    const task = Task.build();

    const user = await User.findByPk(res.locals.user.id, {
      include: [Category],
    });

    const categories = user.Categories;

    // res.send('here')
    res.render("addTask", {
      title: "Add task!",
      task,
      categories,
      csrfToken: req.csrfToken(),
    });
  })
);

router.post(
  "/randomTask",
  csrfProtection,
  asyncHandler(async (req, res, next) => {
    const task = await Task.findAll({
      where: {
        public: false,
      },
      include: Category,
    });

    const randomTask = Task.build({
      userId: res.locals.user.id,
      title: task.title,
      details: task.details,
      categoryId,
      due,
      public,
    });

    res.render("randomTask", {
      title: "randomized task!",
      task,
      categories,
      csrfToken: req.csrfToken(),
    });
    res.redirect("/tasks");
  })
);

router.post(
  "/add",
  csrfProtection,
  taskValidators,
  asyncHandler(async (req, res) => {

    let { title, details, due, categoryId, public } = req.body;
    console.log(typeof due)
    console.log(req.body)
    console.log(categoryId)

    let errors = [];
    const validatorErrors = validationResult(req);
    console.log(categoryId)
    console.log(Array.isArray(categoryId))
    console.log(categoryId[0])
    if (Array.isArray(categoryId)) {
      categoryId = categoryId[0]
    }
    if (categoryId === "No Category") {
      categoryId = null;
    } else {
      categoryId = parseInt(categoryId, 10);
    }

    if (!due) {
      due = null;
    }
    const task = Task.build({
      userId: res.locals.user.id,
      title,
      details,
      categoryId,
      due,
      public,
    });
    // console.log(categoryId)
    if (validatorErrors.isEmpty()) {
      await task.save();
      res.redirect("/tasks");
    } else {
      errors = validatorErrors.array().map((error) => error.msg);
    }
    res.render("addTask", {
      title: "Add task!",
      task,
      categories,
      errors,
      csrfToken: req.csrfToken(),
    });
  })
);

router.get(
  "/",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    // res.send('why are you here')

    const { userId } = req.session.auth;

    const categories = await Category.findAll({
      where: {
        userId,
      },
      include: Task,
    });
    // const incompleteTasks = await Task.findAll({
    //     where: {
    //         categoryId: null,
    //         userId,
    //         completed: "false",
    //     },
    // });
    const incompleteTasks = await Task.findAll({
      where: {
        // categoryId: null,
        userId,
        completed: "false",
      },
      include: Category,
    });
    const completedTasks = await Task.findAll({
      where: {
        categoryId: null,
        userId,
        completed: "true",
      },
    });

    res.render("superTESTMYTASK", {
      categories,
      incompleteTasks,
      completedTasks,
      listTitle: "My Tasks",
    });
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const task = await Task.findByPk(id);
    if (task) {
      res.json({ task });
    } else {
      next(taskNotFoundError(id));
    }
  })
);

// router.get("/", asyncHandler(async (req, res, next) => {

// }))

router.post(
  "/",
  asyncHandler(async (req, res) => {
    // userId from current session
    // const { userId } = req.session.auth
    const { title, details, categoryId, public, due } = req.body;
    const createdTask = await Task.create({
      userId,
      title,
      details,
      categoryId,
      completed,
      public,
      due,
    });
    res.json({ createdTask });
    // Authorization - Check if user is logged in / has a user ID
  })
);

router.get(
  "/edit/:id",
  csrfProtection,
  asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const task = await Task.findByPk(id, {
      include: Category,
    });
    const categories = await Category.findAll({
      where: {
        userId: res.locals.user.id,
      },
    });
    if (task) {
      res.render("testEditTask", {
        title: "Edit Task:",
        task,
        id,
        categories,
        csrfToken: req.csrfToken(),
      });
    } else {
      next(taskNotFoundError(id));
    }
  })
);

router.put(
  "/api/edit/:id(\\d+)",
  asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    let task = await Task.findByPk(id);
    if (task) {
      if (req.body.due === "") {
        req.body.due = null;
      }
      if (req.body.public === "false") {
        req.body.public = false;
      } else if (req.body.public === "true") {
        req.body.public = true;
      }
      if (req.body.categoryId === "No Category") {
        req.body.categoryId = null;
      }

      await task.update({
        title: req.body.title,
        details: req.body.details,
        categoryId: req.body.categoryId,
        public: req.body.public,
        due: req.body.due,
      });
      res.send({ success: true });
    } else {
      next(taskNotFoundError(id));
    }
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const task = await Task.findByPk(id);
    // const { title, details, categoryId, completed, public, due  } = req.body
    if (task) {
      const deleteTask = await task.destroy();
      // Maybe change parameter req.body
      res.json({ deleteTask });
    } else {
      next(taskNotFoundError(id));
    }
  })
);

router.put(
  "/:id/check",
  asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const task = await Task.findByPk(id);
    //  const { userId } = req.session.auth
    if (task) {
      task.completed = "true";
      await task.save();
      res.json({ task });
    } else {
      next(taskNotFoundError(id));
    }
  })
);

module.exports = router;

