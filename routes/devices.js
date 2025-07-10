const express = require('express');
const Device = require('../models/Device');
const router = express.Router();

// Register new device
router.post('/', async (req, res) => {
  try {
    const device = new Device(req.body);
    await device.save(); 
    res.status(201).json(device);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all devices
router.get('/', async (req, res) => {
  try {
    const devices = await Device.find();
    res.json(devices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;