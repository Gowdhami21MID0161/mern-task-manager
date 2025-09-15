const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.priority) filter.priority = req.query.priority;
    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const t = await Task.findById(req.params.id);
    if (!t) return res.status(404).json({ msg: 'Task not found' });
    res.json(t);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, description, dueDate, priority } = req.body;
    if (!title || !title.trim()) return res.status(400).json({ msg: 'Title is required' });

    const allowed = ['low','medium','high'];
    const p = allowed.includes(priority) ? priority : 'medium';

    const newTask = new Task({ title: title.trim(), description, dueDate, priority: p });
    const saved = await newTask.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const allowed = ['low','medium','high'];
    const update = { ...req.body };
    if (update.priority && !allowed.includes(update.priority)) update.priority = 'medium';

    const updated = await Task.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!updated) return res.status(404).json({ msg: 'Task not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const removed = await Task.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ msg: 'Task not found' });
    res.json({ msg: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
