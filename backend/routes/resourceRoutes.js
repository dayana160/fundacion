const express = require('express');
const { protect } = require('../middleware/auth.middleware');
const { uploadFor, parseFieldsOnly } = require('../middleware/upload.middleware');

/**
 * Genera un router estándar para un recurso administrable (hero, servicios,
 * torneos, noticias, galería, estadísticas, equipo).
 *
 * @param {object} controller - objeto devuelto por createCrudController
 * @param {object} options
 * @param {string|null} options.uploadFolder - carpeta de /uploads (null si el recurso no maneja imágenes)
 * @param {string} options.imageFieldName - nombre del campo de archivo en el formulario (por defecto "image")
 */
function createResourceRouter(controller, options = {}) {
  const router = express.Router();
  const { uploadFolder = null, imageFieldName = 'image' } = options;
  // Aunque el recurso no tenga imagen, el formulario del admin envía los datos
  // como multipart/form-data, así que siempre necesitamos un parser de multer.
  const upload = uploadFolder ? uploadFor(uploadFolder).single(imageFieldName) : parseFieldsOnly;

  router.get('/', controller.getAllPublic);
  router.get('/admin', protect, controller.getAllAdmin);
  router.get('/:id', protect, controller.getOne);
  router.post('/', protect, upload, controller.create);
  router.put('/:id', protect, upload, controller.update);
  router.delete('/:id', protect, controller.remove);
  router.patch('/:id/active', protect, controller.toggleActive);

  return router;
}

module.exports = { createResourceRouter };
