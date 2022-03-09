const express = require('express')
const router = express.Router()

const Task = require('../models/task')

// GET all tasks
router.get('/', async (req, res) => {
    const tasks = await Task.find()
    res.json(tasks)
})

// ADD a new task
router.post('/', async (req, res) => {
    const { title, description } = req.body
    const task = new Task({ title, description })
    await task.save()
    res.json({ status: 'Task saved' })
})

// UPDATE a task
router.put('/:id', async (req, res) => {
    const { title, description } = req.body;
    const newTask = { title, description };
    await Task.findByIdAndUpdate(req.params.id, newTask);
    res.json({status: 'Task Updated'});
});
  
// DELETE a task
router.delete('/:id', async (req, res) => {
    await Task.findByIdAndRemove(req.params.id);
    res.json({status: 'Task Deleted'});
});

module.exports = router