// telemedicine-backend/models/HealthMetric.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Defines the schema for a Health Metric reading in the database.
// This model will store pulse and temperature data, typically captured by Arduinos.
const HealthMetricSchema = new Schema({
  patient: {
    type: Schema.Types.ObjectId, // Stores the ObjectId of the patient user
    ref: 'User', // References the 'User' model (specifically, a patient user)
    required: true
  },
  pulse: {
    type: Number,
    required: true, // Patient's pulse rate
    min: 0 // Pulse rate cannot be negative
  },
  temperature: {
    type: Number,
    required: true, // Patient's body temperature
    min: 0 // Temperature cannot be negative
  },
  readingDate: {
    type: Date,
    default: Date.now // Timestamp of when the reading was taken (defaults to current time if not provided)
  }
});

// Exports the Mongoose model based on the HealthMetricSchema.
// 'HealthMetric' will be the name of the collection in MongoDB (it will be pluralized to 'healthmetrics').
module.exports = mongoose.model('HealthMetric', HealthMetricSchema);
