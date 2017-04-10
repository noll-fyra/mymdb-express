// getting all users
var express = require('express')
var router = express.Router()

// setup user model
var User = require('../models/user')

// route for forms
router.get('/users/new', function (req, res) {
  res.send('users/create')
})

router.get('/users/:id/edit', function (req, res, next) {
  User.findById(req.params.id, function (err, data) {
    if (err) next()
    res.render('users/edit', { theUser: data })
  })
})

// route for /users
router.route('/users')
.get(function (req, res) {
  User.find({}, function (err, allUsers) {
    if (err) res.send(err)
    res.send(allUsers)
  })
})
.post(function (req, res, next) {
  var newUser = new User(req.body)
  newUser.save(function (err, newUser) {
    if (err) res.send(err)
    res.send(newUser)
  })
})

router.route('/users/:id')
.get(function (req, res, next) {
  User.findById(req.params.id, function (err, data) {
    if (err) next()
    res.render('users/show', {newDeets: data})
  })
})
.put(function (req, res, next) {
  console.log(req.body)
  User.findOneAndUpdate({_id: req.body.id}, req.body, function (err, data) {
    if (err) next()
    res.redirect('/users/' + req.body.id)
  })
})

module.exports = router
