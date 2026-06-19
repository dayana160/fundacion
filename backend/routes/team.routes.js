const teamController = require('../controllers/team.controller');
const { createResourceRouter } = require('./resourceRoutes');

const router = createResourceRouter(teamController, { uploadFolder: 'team', imageFieldName: 'photo' });

module.exports = router;
