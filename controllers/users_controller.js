// getting all users
var express = require('express')
var router = express.Router()

// setup user model
var User = require('../models/user')

router.get('/users', function (req, res) {
  User.find({}, function (err, allUsers) {
    if (err) res.send(err)
    res.send(allUsers)
  })
})

// creating new users
router.post('/users', function (req, res, next) {
  // create user when we receive the post request
  var newUser = new User(req.body)
  newUser.save(function (err, newUser) {
    if (err) res.send(err)
    res.send(newUser)
  })
})

module.exports = router
