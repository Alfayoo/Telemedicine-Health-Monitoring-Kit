const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// POST /api/appointments/ - Create a new appointment
router.post('/', async (req, res) => {
  try {
    const { patient, doctor, date, time } = req.body;

    if (!patient || !doctor || !date || !time) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newAppointment = new Appointment({ patient, doctor, date, time });
    await newAppointment.save();

    res.status(201).json({ message: 'Appointment created', data: newAppointment });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/appointments/user/:userId - Get all appointments for a user (doctor or patient)
router.get('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    const appointments = await Appointment.find({
      $or: [{ patient: userId }, { doctor: userId }]
    }).populate('doctor', 'name email').populate('patient', 'name email');

    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/appointments/:id - Update appointment status or time
router.put('/:id', async (req, res) => {
  try {
    const { status, date, time } = req.body;

    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status, date, time },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Appointment not found' });

    res.status(200).json({ message: 'Appointment updated', data: updated });
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/appointments/:id - Cancel (delete) an appointment
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Appointment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Appointment not found' });

    res.status(200).json({ message: 'Appointment cancelled', data: deleted });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
