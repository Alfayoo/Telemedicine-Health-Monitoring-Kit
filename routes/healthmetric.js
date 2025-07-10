const express = require('express');
const router = express.Router();
const HealthMetric = require('../models/HealthMetric');
const User = require('../models/User');

// POST /api/healthmetrics/ - Add a new health reading
router.post('/', async (req, res) => {
  try {
    const { patient, pulse, temperature } = req.body;

    // Basic validation
    if (!patient || pulse == null || temperature == null) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newMetric = new HealthMetric({
      patient,
      pulse,
      temperature
    });

    await newMetric.save();
    res.status(201).json({ message: 'Health metric saved', data: newMetric });
  } catch (error) {
    console.error('Error saving health metric:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/healthmetrics/:userId - Get all readings for a user
router.get('/:userId', async (req, res) => {
  try {
    const readings = await HealthMetric.find({ patient: req.params.userId }).sort({ readingDate: -1 });
    res.status(200).json(readings);
  } catch (error) {
    console.error('Error fetching health metrics:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/healthmetrics/:userId/latest - Get the latest reading
router.get('/:userId/latest', async (req, res) => {
  try {
    const latest = await HealthMetric.findOne({ patient: req.params.userId }).sort({ readingDate: -1 });
    if (!latest) return res.status(404).json({ message: 'No readings found' });
    res.status(200).json(latest);
  } catch (error) {
    console.error('Error fetching latest health metric:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/healthmetrics/:id - Delete a reading
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await HealthMetric.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Reading not found' });
    res.status(200).json({ message: 'Reading deleted', data: deleted });
  } catch (error) {
    console.error('Error deleting health metric:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
