const express = require('express');
const { getConfig, updateConfig } = require('../controllers/siteConfig.controller');
const { protect } = require('../middleware/auth.middleware');
const { uploadFor } = require('../middleware/upload.middleware');

const router = express.Router();
const uploadLogo = uploadFor('site').single('logo');

router.get('/', getConfig);
router.put('/', protect, uploadLogo, updateConfig);

module.exports = router;
