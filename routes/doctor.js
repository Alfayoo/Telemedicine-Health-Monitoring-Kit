const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET /api/doctors - Get all doctors
router.get('/', async (req, res) => {
  try {
    const doctors = await User.find({ role: 'doctor' }).select('-password'); // exclude password
    res.status(200).json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/doctors/:id - Get specific doctor by ID
router.get('/:id', async (req, res) => {
  try {
    const doctor = await User.findOne({ _id: req.params.id, role: 'doctor' }).select('-password');
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    res.status(200).json(doctor);
  } catch (error) {
    console.error('Error fetching doctor:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/doctors/:id - Update doctor info (e.g., name or specialization)
router.put('/:id', async (req, res) => {
  try {
    const updates = {};
    const { name, specialization } = req.body;

    if (name) updates.name = name;
    if (specialization) updates.specialization = specialization;

    const doctor = await User.findOneAndUpdate(
      { _id: req.params.id, role: 'doctor' },
      { $set: updates },
      { new: true }
    ).select('-password');

    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

    res.status(200).json({ message: 'Doctor updated', data: doctor });
  } catch (error) {
    console.error('Error updating doctor:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/doctors/:id - Remove doctor from system (optional)
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await User.findOneAndDelete({ _id: req.params.id, role: 'doctor' });
    if (!deleted) return res.status(404).json({ message: 'Doctor not found' });

    res.status(200).json({ message: 'Doctor removed', data: deleted });
  } catch (error) {
    console.error('Error deleting doctor:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
