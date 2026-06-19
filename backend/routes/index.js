const express = require('express');

const router = express.Router();

router.use('/auth', require('./auth.routes'));
router.use('/site-config', require('./siteConfig.routes'));
router.use('/hero', require('./hero.routes'));
router.use('/services', require('./service.routes'));
router.use('/tournaments', require('./tournament.routes'));
router.use('/news', require('./news.routes'));
router.use('/gallery', require('./gallery.routes'));
router.use('/stats', require('./stat.routes'));
router.use('/team', require('./team.routes'));
router.use('/contact-messages', require('./contactMessage.routes'));
router.use('/quote-requests', require('./quoteRequest.routes'));
router.use('/dashboard', require('./dashboard.routes'));

module.exports = router;
