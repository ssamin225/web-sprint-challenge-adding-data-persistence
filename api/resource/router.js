// build your `/api/resources` router here
const express = require('express')
const Resource = require('./model')

const router = express.Router()

router.get('/', (req, res, next) => {
  Resource.findAll()
    .then(resources => {
      res.json(resources)
    }).catch(next)
})

router.post('/', (req, res, next) => {
  if (!req.body.resource_name) {
    next({ status: 400, message: 'resource_name is required' })
  } else {
    Resource.add(req.body)
      .then(newResource => {
        res.status(201).json(newResource)
      }).catch(next)
  }
})

module.exports = router