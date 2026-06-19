const newsController = require('../controllers/news.controller');
const { createResourceRouter } = require('./resourceRoutes');

const router = createResourceRouter(newsController, { uploadFolder: 'news' });

// Ruta pública adicional para obtener una noticia por su slug (página de detalle)
router.get('/slug/:slug', newsController.getBySlug);

module.exports = router;
