const mongoose = require('mongoose');
const validator = require('validator');


var UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength:2,
    trim: true
  },
  age:{
    type: Number,
    trim: true,
    required: true
  },
  email:{
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  }
});

var ProfileSchema = new mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  },
  address:{
    type: String,
    trim: true,
    required: true
  },
  phone_number:{
    type: Number,
    trim: true,
    required: true
  },
  blood_group:{
    type: String,
    trim: true,
    required: true
  },
  full_name:{
    type: String,
    trim: true,
    required: true
  }
});

var User = mongoose.model('User', UserSchema);
var Profile = mongoose.model('Profile', ProfileSchema);

module.exports = {
  User,
  Profile
}
