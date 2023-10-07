const express = require('express');
const taskRoute = express.Router();
require('dotenv').config();
const { taskModel } = require('../models/taskmodel');
const verifyToken = require('../middlewares/authentication');

// Add a new task
taskRoute.post('/', verifyToken, async (req, res, next) => {
    try {
        const { title, description, status } = req.body;

        // Check if required fields are missing
        if ((!title && !description) || !status) {
            return res.status(400).json({ msg: "Required Fields Missing", Fields: ["title", "description"], route: "Add Task Route" });
        }

        // Access user data from the req.user
        let userData = req.user;
        req.body.userId = userData._id;

        // Create a new task
        const task = new taskModel(req.body);
        await task.save();

        // Return a success response
        res.status(201).json({ msg: "Task Created Successfully" });
    } catch (error) {
        res.status(500).json({ msg: "Error in posting task", error });
    }
});

// Retrieve a list of all tasks
taskRoute.get('/', verifyToken, async (req, res, next) => {
    try {
        let userId = req.user._id;

        // Fetch tasks for the authenticated user
        const tasks = await taskModel.find({ userId });

        // Return the list of tasks
        res.json(tasks);
    } catch (error) {
        next(error);
        res.status(500).json({ msg: "Error in getting tasks", error });
    }
});

// Retrieve a specific task by ID
taskRoute.get('/:id', verifyToken, async (req, res, next) => {
    try {
        // Find the task by its ID
        const task = await taskModel.findById(req.params.id);

        // If the task doesn't exist, return a 404 error
        if (!task) return res.status(404).json({ error: 'Task not found' });

        // Return the task
        res.json(task);
    } catch (error) {
        res.status(500).json({ msg: "Error in getting specific task by ID", error });
    }
});

// Update a specific task by ID
taskRoute.put('/:id', verifyToken, async (req, res, next) => {
    try {
        // Find and update the task by its ID
        const task = await taskModel.findByIdAndUpdate(req.params.id, req.body, { new: true });

        // If the task doesn't exist, return a 404 error
        if (!task) return res.status(404).json({ error: 'Task not found' });

        // Return a success response with the updated task
        res.status(201).json({ msg: "Updated Task", task });
    } catch (error) {
        // Handle any errors that occur during task update
        res.status(500).json({ msg: "Error in updating task", error });
    }
});

// Delete a specific task by ID
taskRoute.delete('/:id', verifyToken, async (req, res, next) => {
    try {
        // Find and remove the task by its ID
        const task = await taskModel.findByIdAndRemove(req.params.id);

        // If the task doesn't exist, return a 404 error
        if (!task) return res.status(404).json({ error: 'Task not found' });

        // Return a success message
        res.status(204).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ msg: "Error in deleting task", error });
    }
});

module.exports = taskRoute;
