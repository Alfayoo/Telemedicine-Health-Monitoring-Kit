const express = require('express');
const router = express.Router();

// 🟡 Global variable to store the latest real values
let latestSensorData = {
  temperature: null,
  bpm: null,
  timestamp: null
};

// ✅ POST endpoint to receive real data from Raspberry Pi
router.post('/live', (req, res) => {
  console.log("📥 Received POST to /api/sensor/live");
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);

  const { temperature, bpm } = req.body;

  if (temperature == null || bpm == null) {
    console.error("❌ Missing temperature or bpm");
    return res.status(400).json({ error: 'Missing temperature or bpm' });
  }

  latestSensorData = {
    temperature,
    bpm,
    timestamp: new Date().toISOString()
  };

  console.log(`✅ Updated → Temp: ${temperature}, BPM: ${bpm}`);
  res.status(200).json({ message: 'Data received successfully' });
});

// ✅ GET endpoint to return the latest real data to the frontend
router.get('/live', (req, res) => {
  if (latestSensorData.temperature === null || latestSensorData.bpm === null) {
    return res.status(204).json({ message: 'No data yet' }); // No content yet
  }
  res.json(latestSensorData);
});

module.exports = router;
