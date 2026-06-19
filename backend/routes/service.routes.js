const serviceController = require('../controllers/service.controller');
const { createResourceRouter } = require('./resourceRoutes');

const router = createResourceRouter(serviceController, { uploadFolder: 'services' });

module.exports = router;
