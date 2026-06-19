const statController = require('../controllers/stat.controller');
const { createResourceRouter } = require('./resourceRoutes');

const router = createResourceRouter(statController, { uploadFolder: null });

module.exports = router;
