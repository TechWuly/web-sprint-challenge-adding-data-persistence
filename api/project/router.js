// build your `/api/projects` router here
 const express = require('express')
const Projects = require('./model')

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const projects = await Projects.getProjects()
    res.json(projects)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    if (!req.body.project_name) {
      return res.status(400).json({ 
        message: "project_name is required" 
      })
    }
    
    const newProject = await Projects.createProject(req.body)
    res.status(201).json(newProject)
  } catch (err) {
    next(err)
  }
})

module.exports = router