const express = require('express');
const session = require('express-session');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const { Task, User, Category } = require('../db/models')
const { asyncHandler, csrfProtection } = require('../utils')
const { requireAuth } = require('../auth');
const { json } = require('express');
const taskNotFoundError = (id) => {
    const err = Error(`Task ${id} could not be found.`)
    err.title = `Task not found.`
    err.status = 404;
    return err;
}

router.get('/create', csrfProtection, asyncHandler(async (req, res, next) => {
    console.log('the problem is here')
    // res.send('test')
    const task = Task.build()

    // console.log(res.locals.user)
    const user = await User.findByPk(res.locals.user.id, {
        include: [Category]
    })

    const categories = user.Categories

    console.log(categories)
    // res.send('here')
    res.render("addTask", {
        title: "Add task!",
        task,
        categories,
        csrfToken: req.csrfToken()
    })

}))


const taskValidators = [
    check('title')
        .exists({ checkFalsy: true })
        .withMessage('Enter task title')
        .isLength({ max: 50 })
        .withMessage("Task title must be less than 50 characters! Save some for the details section!")
        .custom((value) => {
            let emptyString = '  '
            if (value.trim() === emptyString.trim()) {
                throw new Error("Title cannot be empty space");
            }
            return true;
        }),
];


router.post('/add', csrfProtection, taskValidators, asyncHandler(async (req, res) => {
    console.log(res.locals)
    console.log(req.session.auth)
    console.log(req.body)
    const { title, details, due, category, public } = req.body

    let errors = [];
    const validatorErrors = validationResult(req)

    const task = Task.build({
        userId: res.locals.user.id,
        title,
        details,
        categoryId: category,
        due,
        public
    })

    const user = await User.findByPk(res.locals.user.id, {
        include: [Category]
    })

    const categories = user.Categories

    if (category === "No Category" || !category) {
        task.categoryId = null;
    } else {
        task.categoryId = parseInt(category, 10)
    }

    if (!due) {
        task.due = null;
    }
    if (validatorErrors.isEmpty()) {

        await task.save()
        res.redirect('/tasks')

    } else {
        errors = validatorErrors.array().map((error) => error.msg)
    }
    res.render("addTask", {
        title: "Add task!",
        task,
        categories,
        errors,
        csrfToken: req.csrfToken()
    })

}))




router.get('/', requireAuth, asyncHandler(async (req, res, next) => {
    // res.send('why are you here')
    // console.log(res.locals)

    const { userId } = req.session.auth
    console.log(userId)
    const categories = await Category.findAll({
        where: {
            userId
        },
        include: Task
    })
    const incompleteTasks = await Task.findAll({
        where: {
            userId,
            completed: 'false'
        }
    })
    const completedTasks = await Task.findAll({
        where: {
            userId,
            completed: 'true'
        }
    })

    // console.log(categories)
    res.render("mytasks", { categories, incompleteTasks, completedTasks })
}))


router.get('/:id', asyncHandler(async (req, res, next) => {
    const id = req.params.id
    const task = await Task.findByPk(id)
    if (task) {
        res.json({ task })
    } else {
        next(taskNotFoundError(id))
    }
}))

router.post('/', asyncHandler(async (req, res) => {
    // userId from current session
    // const { userId } = req.session.auth
    const { title, details, categoryId, public, due } = req.body
    const createdTask = await Task.create({ userId, title, details, categoryId, completed, public, due })
    res.json({ createdTask })
    // Authorization - Check if user is logged in / has a user ID
}))


router.get('/edit/:id', csrfProtection, asyncHandler(async (req, res, next) => {

    const id = req.params.id
    const task = await Task.findByPk(id, {
        include: Category
    })
    const categories = await Category.findAll({
        where: {
            userId: res.locals.user.id
        }
    })
    if (task) {
        res.render('testEditTask', {
            title: "Edit Task:",
            task,
            id,
            categories,
            csrfToken: req.csrfToken()
        })
    } else {
        next(taskNotFoundError(id))
    }

}))

router.put('/api/edit/:id(\\d+)', asyncHandler(async (req, res, next) => {
    const id = req.params.id
    let task = await Task.findByPk(id);
    if (task) {
        console.log(req.body)
        if (req.body.due === "") {
            req.body.due = null;
        }
        console.log(req.body)
        // console.log(public)
        if (req.body.public === "false") {
            req.body.public = false;
        } else if (req.body.public === "true") {
            req.body.public = true;
        }
        if (req.body.categoryId === "No Category") {
            req.body.categoryId = null;
        }

        console.log(task)
        await task.update({
            title: req.body.title,
            details: req.body.details,
            categoryId: req.body.categoryId,
            public: req.body.public,
            due: req.body.due
        })
        res.send({ success: true })
    } else {
        next(taskNotFoundError(id))
    }
}))

router.delete('/:id', asyncHandler(async (req, res, next) => {
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






module.exports = router
