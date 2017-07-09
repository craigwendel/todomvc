const fs = require('fs')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const Todo = require('./models/todotasks.js')
const mongoose = require('mongoose')

const app = express()

app.use('/static', express.static('static'))
app.use(bodyParser.json())

mongoose.Promise = require('bluebird')
mongoose.connect('mongodb://localhost:27017/tododb')

app.get('/', function (req, res) {
  res.sendFile(__dirname + "/static/index.html")
})

// put routes here
app.get('/api/todos/', function (req, res) {
  Todo.find()
  .then(function (todos) {
    res.json(todos)
  })
})

app.get('/api/todos/:id', function (req, res) {
  Todo.findOne({'_id': req.params.id})
    .then(function (todos) {
      res.json(todos)
    })
})
app.delete('/api/todos:id', function (req, res) {
  todo = Todo.findOne({'_id': req.params.id})
  console.log(todo)
  .then(function (todos) {
    res.json(todos)
  })
})

app.post('/api/todos/', function (req, res) {
  if (req.body._id) {
    Todo.findOne({'_id': req.params._id})
    .then(function (todo) {
      todo.title = req.body.title
      todo.order = req.body.order
      todo.completed = req.body.completed
      todo.save().then(function (todo) {
        console.log('This is the editedtask info from the if')
        res.json(todo)
      })
    })
  } else {
    let todo = new Todo()
    todo.title = req.body.title
    todo.order = req.body.order
    todo.completed = req.body.completed
    todo.save()
  .then(function (todo) {
    console.log('This is the new task info from the else')
    res.json(todo)
  })
.catch(function (error) {
  res.status(422).json(error)
})
  }
})

app.listen(3000, function () {
  console.log('Express running on http://localhost:3000/.')
})
