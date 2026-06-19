const heroController = require('../controllers/hero.controller');
const { createResourceRouter } = require('./resourceRoutes');

const router = createResourceRouter(heroController, { uploadFolder: 'hero' });

module.exports = router;
