// build your `/api/tasks` router here
const express = require('express')
const Task = require('./model')

const router = express.Router()

router.get('/', (req, res, next) => {
  Task.findAll()
    .then(tasks => {
      res.json(tasks)
    }).catch(next)
})

router.post('/', (req, res, next) => {
  if (!req.body.task_description) {
    next({ status: 400, message: 'task_description is required' })
  } else {
    Task.add(req.body)
      .then(newTask => {
        res.status(201).json(newTask)
      }).catch(next)
  }
})

module.exports = router