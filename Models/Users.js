const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    role: {
      type: String,
      enum: ['user', 'caretaker', 'admin', 'superadmin'],
      default: 'user'
    },
    hasadminaccess: {
      type: Boolean,
      default: false
    },
    phone: {
      type: String,
      trim: true
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      default: 'other'
    },
  },
  {
    timestamps: true
  }
);


module.exports = mongoose.model('User', Schema);