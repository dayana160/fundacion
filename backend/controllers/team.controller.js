const { createCrudController } = require('./crudFactory');

const teamController = createCrudController('team_members', {
  fields: ['name', 'role', 'bio', 'order_index', 'active'],
  imageColumn: 'photo_url',
  uploadFolder: 'team',
  orderBy: 'order_index ASC, id ASC',
});

module.exports = teamController;
