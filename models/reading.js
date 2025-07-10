const mongoose = require('mongoose');

const readingSchema = new mongoose.Schema({
  deviceId: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  temperature: { type: Number, required: true },
  heartRate: { type: Number, required: true },
  batteryLevel: Number,
  alerts: [{
    type: String,
    message: String,
    severity: { type: String, enum: ['low', 'medium', 'high'] }
  }]
});

module.exports = mongoose.model('Reading', readingSchema);