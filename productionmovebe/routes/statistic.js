const express = require('express');

const staticController = require('../controllers/statistic');

const router = express.Router();

router.get('/get-months', staticController.getMonths);

router.get('/get-quantity', staticController.getQuantity);

module.exports = router;
