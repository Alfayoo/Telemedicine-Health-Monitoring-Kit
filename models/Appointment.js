// telemedicine-backend/models/Appointment.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Defines the schema for an Appointment in the database.
// Appointments link a patient to a doctor at a specific date and time.
const AppointmentSchema = new Schema({
  patient: {
    type: Schema.Types.ObjectId, // Stores the ObjectId of the patient user
    ref: 'User', // References the 'User' model
    required: true
  },
  doctor: {
    type: Schema.Types.ObjectId, // Stores the ObjectId of the doctor user
    ref: 'User', // References the 'User' model
    required: true
  },
  date: {
    type: Date,
    required: true // The date of the appointment
  },
  time: {
    type: String, // The time of the appointment (e.g., "10:00 AM", "14:30")
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'], // Possible states of an appointment
    default: 'pending' // Initial status when an appointment is created
  },
  createdAt: {
    type: Date,
    default: Date.now // Timestamp of when the appointment record was created
  }
});

// Exports the Mongoose model based on the AppointmentSchema.
// 'Appointment' will be the name of the collection in MongoDB (it will be pluralized to 'appointments').
module.exports = mongoose.model('Appointment', AppointmentSchema);

