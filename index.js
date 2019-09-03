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

server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params

  db.remove(id)
    .then(user => {
      if (user) {
        res.json({
          id: id,
          message: 'This user has been deleted'
        }) 
      } else { 
        res.status(404).json({
          message: 'The user with the specified ID does not exist'
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        error: 'The user could not be removed'
      })
    })
})

server.put('/api/users/:id', (req, res) => {
  const { id } = req.params
  const changes = req.body

  db.update(id, changes)
    .then(user => {
      if (user) {
        if ( req.body.name === undefined || req.body.bio === undefined) {
          res.status(400).json({
            errorMessage: "Please provide name and bio for the user."
          }) 
        } else {
          res.status(200).json({
            changes
          })
        }
      } else {
        res.status(404).json({
          message: 'The user with the specified ID does not exist.'
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        error: "The user information could not be modified."
      })
    })
})


server.listen(3636, () => {
  console.log('Server is running on port 3636...')
})