const express = require("express");
const session = require("express-session");
const router = express.Router();
const { Task, User, Category } = require("../db/models");
const { asyncHandler } = require("../utils");

const taskNotFoundError = (id) => {
  const err = Error(`Task ${id} could not be found.`);
  err.title = `Task not found.`;
  err.status = 404;
  return err;
};

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const { userId } = req.session.auth;
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

    // console.log(categories)
    res.render("mytasks", { categories, incompleteTasks, completedTasks });
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
      // task.completed = "true";
      // await task.save();
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
