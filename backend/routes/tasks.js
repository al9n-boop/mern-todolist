// routes/tasks.js - REST API for tasks (mounted at /api/tasks)
const express = require("express");
const mongoose = require("mongoose");
const Task = require("../models/Task");

const router = express.Router();

// Returns true if the id is a valid MongoDB ObjectId
const validId = (id) => mongoose.Types.ObjectId.isValid(id);

// GET /api/tasks - fetch all tasks (oldest first)
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: 1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// POST /api/tasks - add a new task
router.post("/", async (req, res) => {
  try {
    const title = String(req.body.title ?? "").trim();
    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }
    const task = await Task.create({ title });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: "Failed to create task" });
  }
});

// PUT /api/tasks/:id - update title and/or completed status
router.put("/:id", async (req, res) => {
  try {
    if (!validId(req.params.id)) {
      return res.status(404).json({ error: "Task not found" });
    }

    const updates = {};

    if (req.body.title !== undefined) {
      const title = String(req.body.title).trim();
      if (!title) {
        return res.status(400).json({ error: "Title cannot be empty" });
      }
      updates.title = title;
    }

    if (req.body.completed !== undefined) {
      updates.completed = Boolean(req.body.completed);
    }

    const task = await Task.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: "Failed to update task" });
  }
});

// DELETE /api/tasks/:id - delete a task
router.delete("/:id", async (req, res) => {
  try {
    if (!validId(req.params.id)) {
      return res.status(404).json({ error: "Task not found" });
    }
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json({ message: "Task deleted", id: task._id });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete task" });
  }
});

module.exports = router;
