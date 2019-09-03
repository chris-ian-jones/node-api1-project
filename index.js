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
        error: 'The users information could not be retrieved.'
      })
    })
})

server.get('/api/users/:id', (req, res) => {
  const { id } = req.params
  db.findById(id)
    .then(user => {
      user ? res.json(user) : res.status(404).json({
        message: 'The user with the specified ID does not exist.'
      })
    })
    .catch(err => {
      res.status(500).json({
        error: 'The user information could not be retrieved.'
      })
    })
})

server.post('/api/users', (req, res) => {
  const newUser = req.body

  if ( req.body.name === undefined || req.body.bio === undefined) {
    res.status(400).json({
      errorMessage: "Please provide name and bio for the user."
    })
  } else {
    db.insert(newUser)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(err => {
      res.status(500).json({
        error: 'There was an error while saving the user to the database'
      })
    })
  }
})

server.listen(3636, () => {
  console.log('Server is running on port 3636...')
})