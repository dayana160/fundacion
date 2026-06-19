const galleryController = require('../controllers/gallery.controller');
const { createResourceRouter } = require('./resourceRoutes');

const router = createResourceRouter(galleryController, { uploadFolder: 'gallery' });

module.exports = router;
