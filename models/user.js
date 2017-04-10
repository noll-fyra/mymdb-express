var mongoose = require('mongoose')

// setting up schema
var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User name cannot be empty'],
    minlength: [3, 'User name too short']
  },
  email: String,
  password: String
})

// setting up models
var User = mongoose.model('User', userSchema)

module.exports = User
