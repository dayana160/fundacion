const { createCrudController } = require('./crudFactory');

const heroController = createCrudController('hero_slides', {
  fields: [
    'title_line1', 'title_highlight', 'title_line2', 'subtitle',
    'button1_text', 'button1_link', 'button2_text', 'button2_link',
    'order_index', 'active',
  ],
  imageColumn: 'image_url',
  uploadFolder: 'hero',
  orderBy: 'order_index ASC, id ASC',
});

module.exports = heroController;
