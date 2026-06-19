const express = require('express');
const { getSummary } = require('../controllers/dashboard.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/summary', protect, getSummary);

module.exports = router;
