// getting all movies
var express = require('express')
var router = express.Router()

// setup movie model
var Movie = require('../models/movie')

// route for forms
router.get('/movies/new', function (req, res) {
  res.send('movies/create')
})

router.get('/movies/:id/edit', function (req, res, next) {
  Movie.findById(req.params.id, function (err, data) {
    if (err) next()
    res.render('movies/edit', { theMovie: data })
  })
})

// route for /movies
router.route('/movies')
.get(function (req, res) {
  Movie.find({}, function (err, allMovies) {
    if (err) res.send(err)
    res.send(allMovies)
  })
})
.post(function (req, res, next) {
  var newMovie = new Movie(req.body)
  newMovie.save(function (err, newMovie) {
    if (err) res.send(err)
    res.send(newMovie)
  })
})

router.route('/movies/:id')
.get(function (req, res) {
  res.send('individual movie details on id: ' + req.params.id)
})
.put(function (req, res) {
  res.send('individual movie details on id: ' + req.params.id)
})

module.exports = router
