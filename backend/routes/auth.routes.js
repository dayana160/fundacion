const express = require('express');
const { login, logout, me, changePassword, updateProfile } = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);
router.get('/me', protect, me);
router.put('/password', protect, changePassword);
router.put('/profile', protect, updateProfile);

module.exports = router;
