const express = require('express')
const Tasks = require('./model')

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const tasks = await Tasks.getTasks()
    res.json(tasks)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    if (!req.body.task_description) {
      return res.status(400).json({ 
        message: "task_description is required" 
      })
    }
    
    if (!req.body.project_id) {
      return res.status(400).json({ 
        message: "project_id is required" 
      })
    }

    const project = await require('../project/model')
      .getProjects()
      .then(projects => projects.find(p => p.project_id === req.body.project_id))
    
    if (!project) {
      return res.status(400).json({ 
        message: "project_id does not exist" 
      })
    }
    
    const newTask = await Tasks.createTask(req.body)
    res.status(201).json(newTask)
  } catch (err) {
    next(err)
  }
})

module.exports = router