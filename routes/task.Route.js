const express = require('express');
const { taskModel } = require('../models/taskmodel');
const verifyToken = require('../middlewares/authentication');
const taskRoute = express.Router()
require('dotenv').config()

// Add a new task
taskRoute.post('/', verifyToken, async (req, res, next) => {
    try {
        const { title, description, status } = req.body
        if (!title && !description && !status) return res.status(400).json({ msg: "Required Fields Missing", Fields: ["title", "description", "status"], route: "Add Task Route" })
        let userdata = (req.user);
        req.body.userId = userdata._id
        const task = new taskModel(req.body);
        await task.save();
        res.status(201).json({msg:"Task Created Successfully"});
    } catch (err) {
        res.status(500).json({ msg: "error in posting task", error })
    }
});

// Retrieve a list of all tasks
taskRoute.get('/', verifyToken, async (req, res, next) => {
    try {
        let userId= (req.user._id);
        const tasks = await taskModel.find({userId});
        res.json(tasks);
    } catch (err) {
        next(err);
        res.status(500).json({ msg: "error in getting task", error })
    }
});

// Retrieve a specific task by ID
taskRoute.get('/:id', verifyToken, async (req, res, next) => {
    try {
        const task = await taskModel.findById(req.params.id);
        if (!task)return res.status(404).json({ error: 'Task not found' });
        res.json(task);
    } catch (err) {
        res.status(500).json({ msg: "error in getting specific task by ID", error })

    }
});

// Update a specific task by ID
taskRoute.put('/:id', verifyToken, async (req, res, next) => {
    try {
        const task = await taskModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!task)return res.status(404).json({ error: 'Task not found' });
        res.json({msg:"Updated Task",task});
    } catch (err) {
        res.status(500).json({ msg: "error in updating task", error })
    }
});

// Delete a specific task by ID
taskRoute.delete('/:id', verifyToken, async (req, res, next) => {
    try {
        const task = await taskModel.findByIdAndRemove(req.params.id);
        if (!task)return res.status(404).json({ error: 'Task not found' });
        res.json({ message: 'Task deleted successfully' });
    } catch (err) {
        res.status(500).json({ msg: "error in deleting task", error })
    }
});


module.exports = taskRoute
