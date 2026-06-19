const { createCrudController } = require('./crudFactory');

const statController = createCrudController('stats', {
  fields: ['icon', 'value', 'label', 'order_index', 'active'],
  imageColumn: null,
  orderBy: 'order_index ASC, id ASC',
});

module.exports = statController;
