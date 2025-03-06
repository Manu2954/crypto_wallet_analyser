const express = require('express');
const cors = require('cors');
const walletRoutes = require('./routes/walletRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/wallet', walletRoutes);

module.exports = app;
