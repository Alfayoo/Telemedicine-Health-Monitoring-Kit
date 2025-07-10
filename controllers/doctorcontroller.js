const Doctor = require('../models/doctor');

// Register a doctor
exports.registerDoctor = async (req, res) => {
  try {
    const { name, specialization, contact, email } = req.body;

    const existing = await Doctor.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'Doctor already exists' });
    }

    const doctor = new Doctor({ name, specialization, contact, email });
    await doctor.save();
    res.status(201).json(doctor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all doctors
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
