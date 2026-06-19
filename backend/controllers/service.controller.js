const { createCrudController } = require('./crudFactory');

const serviceController = createCrudController('services', {
  fields: ['icon', 'title', 'description', 'show_on_home', 'order_index', 'active'],
  imageColumn: 'image_url',
  uploadFolder: 'services',
  orderBy: 'order_index ASC, id ASC',
});

module.exports = serviceController;
