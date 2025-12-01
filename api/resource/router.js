// build your `/api/resources` router here
 const express = require('express')
const Resources = require('./model')

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const resources = await Resources.getResources()
    res.json(resources)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    if (!req.body.resource_name) {
      return res.status(400).json({ 
        message: "resource_name is required" 
      })
    }
    
    const newResource = await Resources.createResource(req.body)
    res.status(201).json(newResource)
  } catch (err) {
    if (err.message.includes('UNIQUE constraint failed')) {
      return res.status(400).json({ 
        message: "resource_name must be unique" 
      })
    }
    next(err)
  }
})

module.exports = router