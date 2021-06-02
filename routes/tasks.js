const express = require('express');
const session = require('express-session');
const router = express.Router();
const { Task, User } = require('../db/models')
const { asyncHandler } = require('../utils')
const session = require('express-session');


const taskNotFoundError = (id) => {
    const err = Error(`Task ${id} could not be found.`)
    err.title = `Task not found.`
    err.status = 404;
    return err;
}

router.get('/', asyncHandler(async(req, res) => {
    const tasks = await Task.findAll();
    res.json({ tasks })
}))

router.get('/:id', asyncHandler(async(req, res, next) => {
    const id = req.params.id
    const task = await Task.findByPk(id)
    if (task) {
        res.json({task})
    } else {
        next(taskNotFoundError(id))
    }
}))

router.post('/', asyncHandler(async(req, res) => {
    // userId from current session
    // const { userId } = req.session.auth
    const userId = 1;
    const { title, details, categoryId, public, due  } = req.body
    const createdTask = await Task.create({ userId=userId, title, details, categoryId, completed, public, due})
    res.json({createdTask})
    // Authorization - Check if user is logged in / has a user ID
}))

router.put('/:id', asyncHandler(async(req, res, next) => {
    const id = req.params.id
    const task = await Task.findByPk(id);
    //  const { userId } = req.session.auth
    const userId = 1;
    const { title, details, categoryId, completed, public, due } = req.body
    if (task) {
    const updatedTask = await task.update(userId, title, details, categoryId, completed, public, due)
        // Maybe change parameter req.body
        res.json({ updatedTask })
    } else {
        next(taskNotFoundError(id))
    }
}))

router.delete('/:id', asyncHandler(async(req, res, next) => {
    const id = req.params.id
    const task = await Task.findByPk(id);
    // const { title, details, categoryId, completed, public, due  } = req.body
    if (task) {
    const deleteTask = await task.destroy()
        // Maybe change parameter req.body
        res.json({ deleteTask })
    } else {
        next(taskNotFoundError(id))
    }
}))



module.exports = router;
