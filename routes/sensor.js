const express = require('express');
const router = express.Router();

// POST endpoint to receive sensor data
router.post('/', (req, res) => {
  const { temperature, bpm } = req.body;

  if (temperature == null || bpm == null) {
    return res.status(400).json({ error: 'Missing temperature or bpm' });
  }

  console.log(`🌡️ Temperature: ${temperature} °C`);
  console.log(`❤️ BPM: ${bpm}`);

  // You can save to MongoDB here if needed
  // Example:
  // const newMetric = new HealthMetric({ temperature, bpm, timestamp: new Date() });
  // await newMetric.save();

  res.status(200).json({ message: 'Data received successfully' });
});

module.exports = router;
