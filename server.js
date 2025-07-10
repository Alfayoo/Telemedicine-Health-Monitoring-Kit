// telemedicine-backend/server.js
// This is the main entry point for your Node.js Express application.

// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const devicesRoutes= require('./routes/devices'); // Device Routes
const appointmentRoutes = require('./routes/appointment');
const doctorRoutes = require('./routes/doctor');
const healthMetricRoutes = require('./routes/healthMetric'); // Health Metric Routes
const sensorRoute = require('./routes/sensor');

const app = express();

// --- Database Connection ---
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      console.error('MONGO_URI is not defined in your .env file.');
      process.exit(1); // Exit process if URI is missing
    }
    mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

// Connect to the database
connectDB();

// --- Middleware ---
// THIS IS CRUCIAL: It parses incoming JSON payloads from requests (like from your Arduino)
// and makes them available on req.body.
app.use(express.json());

// --- Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/doctors', doctorRoutes);
// The healthMetricRoutes are mounted here, including the /api/device/healthmetrics endpoint
app.use('/api/healthmetrics', healthMetricRoutes);
// mounts the route for sensor
app.use('/api/sensor', sensorRoute);


// --- Basic Root Route ---
app.get('/', (req, res) => {
  res.send('Telemedicine Backend API is running!');
});

// --- Server Start ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));

