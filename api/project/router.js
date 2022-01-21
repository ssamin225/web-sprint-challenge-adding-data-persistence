// build your `/api/projects` router here
const express = require('express')
const Project = require('./model')

const router = express.Router()

router.get('/', (req, res, next) => {
  Project.findAll()
    .then(projects => {
      res.json(projects)
    }).catch(next)
})

router.post('/', (req, res, next) => {
  if (!req.body.project_name) {
    next({ status: 400, message: 'project_name is required' })
  } else {
    Project.add(req.body)
      .then(newProject => {
        res.status(201).json(newProject)
      }).catch(next)
  }
})

module.exports = router