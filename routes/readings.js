const express = require('express');
const Reading = require('../models/Reading');
const Device = require('../models/Device');
const { checkAlerts } = require('../utils/alerts');
const router = express.Router();

// Receive sensor data
router.post('/', async (req, res) => {
  try {
    const reading = new Reading(req.body);
    
    // Check for alerts
    reading.alerts = checkAlerts(reading.temperature, reading.heartRate);
    
    await reading.save();
    
    // Update device last seen
    await Device.findOneAndUpdate(
      { deviceId: reading.deviceId },
      { lastSeen: new Date() }
    );
    
    res.status(201).json(reading);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get readings for a device
router.get('/:deviceId', async (req, res) => {
  try {
    const readings = await Reading.find({ deviceId: req.params.deviceId })
      .sort({ timestamp: -1 })
      .limit(100);
    res.json(readings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;