const express = require('express');
const { fetchTransactions } = require('../controllers/walletController');

const router = express.Router();

// Securely fetch wallet transactions using POST
router.post('/transactions', fetchTransactions);

module.exports = router;
