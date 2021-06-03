const express = require("express");
const router = express.Router();
const { Category } = require("../db/models");
const { asyncHandler } = require("../utils");

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
    const id = req.params.id;
    const findCat = await Category.findByPk(id);
    if (findCat) {
      res.json({ findCat });
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

module.exports = router;
