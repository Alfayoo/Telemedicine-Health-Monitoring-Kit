const Appointment = require('../models/appointment');

// Create appointment
exports.createAppointment = async (req, res) => {
  try {
    const { doctorId, userId, date, time, reason } = req.body;

    const appointment = new Appointment({
      doctor: doctorId,
      user: userId,
      date,
      time,
      reason,
    });

    await appointment.save();
    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all appointments
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('doctor', 'name specialization')
      .populate('user', 'name email')
      .sort({ date: 1 });

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
