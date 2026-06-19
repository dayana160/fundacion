const { createCrudController } = require('./crudFactory');

const tournamentController = createCrudController('tournaments', {
  fields: [
    'title', 'start_date', 'end_date', 'location', 'description',
    'status', 'registration_link', 'order_index', 'active',
  ],
  imageColumn: 'image_url',
  uploadFolder: 'tournaments',
  orderBy: 'order_index ASC, start_date ASC',
});

module.exports = tournamentController;
