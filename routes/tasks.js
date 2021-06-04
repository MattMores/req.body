const express = require("express");
const router = express.Router();
const session = require("express-session");
const { check, validationResult } = require("express-validator");
const { Task, User, Category } = require("../db/models");
const { asyncHandler, csrfProtection } = require("../utils");

const taskNotFoundError = (id) => {
  const err = Error(`Task ${id} could not be found.`);
  err.title = `Task not found.`;
  err.status = 404;
  return err;
};

router.get(
  "/create",
  csrfProtection,
  asyncHandler(async (req, res, next) => {
    console.log("the problem is here");
    // res.send('test')
    const task = Task.build();

    // console.log(res.locals.user)
    const user = await User.findByPk(res.locals.user.id, {
      include: [Category],
    });

    const categories = user.Categories;

    console.log(categories);
    // res.send('here')
    res.render("superTestAddTask", {
      title: "Add task!",
      task,
      categories,
      csrfToken: req.csrfToken(),
    });
  })
);
const taskValidators = [
  check("title").exists({ checkFalsy: true }).withMessage("Enter task title"),
];

router.post(
  "/add",
  csrfProtection,
  taskValidators,
  asyncHandler(async (req, res) => {
    console.log(res.locals);
    console.log(req.session.auth);
    console.log(req.body);
    const { title, details, due, category, public } = req.body;

    let errors = [];
    const validatorErrors = validationResult(req);

    const task = Task.build({
      userId: res.locals.user.id,
      title,
      details,
      categoryId: category,
      due,
      public,
    });

    const user = await User.findByPk(res.locals.user.id, {
      include: [Category],
    });

    const categories = user.Categories;

    if (category === "No Category" || !category) {
      task.categoryId = null;
    } else {
      task.categoryId = parseInt(category, 10);
    }

    if (!due) {
      task.due = null;
    }
    if (validatorErrors.isEmpty()) {
      await task.save();
      res.redirect("/");
    } else {
      errors = validatorErrors.array().map((error) => error.msg);
    }
    res.render("superTestAddTask", {
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
  asyncHandler(async (req, res) => {
    // res.send('why are you here')
    // console.log(res.locals)
    const { userId } = req.session.auth;
    console.log(userId);
    const categories = await Category.findAll({
      where: {
        userId: userId,
      },
      include: Task,
    });
    const incompleteTasks = await Task.findAll({
      where: {
        userId: userId,
        completed: "false",
      },
    });
    const completedTasks = await Task.findAll({
      where: {
        userId: userId,
        completed: "true",
      },
    });

    console.log(completedTasks)
    res.render("mytasks", { categories, incompleteTasks, completedTasks, listTitle: 'My Tasks' });
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

router.put(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const task = await Task.findByPk(id);
    //  const { userId } = req.session.auth
    const { title, details, categoryId, completed, public, due } = req.body;
    if (task) {
      const updatedTask = await task.update({
        userId,
        title,
        details,
        categoryId,
        completed,
        public,
        due,
      });
      // Maybe change parameter req.body
      res.json({ updatedTask });
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

module.exports = router;
