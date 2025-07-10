const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  deviceId: { type: String, required: true, unique: true },
  patientName: { type: String, required: true },
  location: String,
  isActive: { type: Boolean, default: true },
  lastSeen: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Device', deviceSchema);