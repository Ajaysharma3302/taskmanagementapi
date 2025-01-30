const express = require("express");
const Task = require("../models/taskmodel");
const authMiddleware = require("../middlewares/authMiddleware")
const taskRouter = express.Router();

taskRouter.post("/tasks", authMiddleware, async (req, res) => {
  try {
    const { title, description, dueDate, priority, status } = req.body;
    const task = new Task({ title, description, dueDate, priority, status });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).send(error);
  }
});
taskRouter.get("/tasks", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});
taskRouter.get("/tasks/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).send({ error: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).send(error);
  }
});
taskRouter.patch("/tasks/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) {
      return res.status(404).send({ error: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(400).send(error);
  }
});
taskRouter.delete("/tasks/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).send({ error: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = taskRouter;
