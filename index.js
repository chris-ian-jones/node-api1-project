const express = require('express')

const db = require('./data/db')

const server = express()

server.use(express.json())

server.get('/api/users', (req, res) => {
  db.find()
    .then(users => {
      res.json(users)
    })
    .catch(err => {
      res.status(500).json({
        err: err,
        message: 'failed to get users'
      })
    })
})

server.get('/api/users/:id', (req, res) => {
  const { id } = req.params
  db.findById(id)
    .then(user => {
      user ? res.json(user) : res.status(404).json({
        message: 'invaled user id'
      })
    })
    .catch(err => {
      res.status(500).json({
        err: err,
        message: 'failed to get user by id'
      })
    })
})

server.listen(3636, () => {
  console.log('Server is running on port 3636...')
})