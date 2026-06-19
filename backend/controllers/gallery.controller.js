const { createCrudController } = require('./crudFactory');

const galleryController = createCrudController('gallery', {
  fields: ['caption', 'category', 'order_index', 'active'],
  imageColumn: 'image_url',
  uploadFolder: 'gallery',
  orderBy: 'order_index ASC, id DESC',
});

module.exports = galleryController;
