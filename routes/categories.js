const express = require("express");
const router = express.Router();
const { Category, Task } = require("../db/models");
const { asyncHandler } = require("../utils");
const { requireAuth } = require("../auth");

const catNotFoundError = (id) => {
  const err = Error(`Category ${id} not found`);
  err.title = "Category not found";
  err.status = 404;
  return err;
};

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
    });

    const completedTasks = await Task.findAll({
      where: {
        categoryId: id,
        userId: userId,
        completed: "true",
      },
    });

    if (category) {
      res.render("mytasks", {
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
  asyncHandler(async (req, res, next) => {
    const { userId } = req.session.auth;
    const { title } = req.body;
    const createCategory = await Category.create({ userId, title });
    res.json({ createCategory });
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

module.exports = router;
