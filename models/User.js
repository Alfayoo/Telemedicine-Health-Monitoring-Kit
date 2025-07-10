// telemedicine-backend/models/User.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Defines the schema for a User in the database.
// Users can be either 'patient' or 'doctor'.
const UserSchema = new Schema({
  name: {
    type: String,
    required: true // User's full name
  },
  email: {
    type: String,
    required: true,
    unique: true // Email must be unique for login and identification
  },
  password: {
    type: String,
    required: true // Hashed password for security
  },
  role: {
    type: String,
    enum: ['patient', 'doctor'], // Restricts role to only 'patient' or 'doctor'
    default: 'patient', // Default role if not specified
    required: true
  },
  specialization: { // This field is only relevant and required if the user's role is 'doctor'.
    type: String,
    required: function() {
      // 'this' refers to the document being validated.
      // Specialization is required only if the role field is 'doctor'.
      return this.role === 'doctor';
    }
  },
  date: {
    type: Date,
    default: Date.now // Timestamp of when the user account was created
  }
});

// Exports the Mongoose model based on the UserSchema.
// 'User' will be the name of the collection in MongoDB (it will be pluralized to 'users').
module.exports = mongoose.model('User', UserSchema);
