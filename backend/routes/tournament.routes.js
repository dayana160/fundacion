const tournamentController = require('../controllers/tournament.controller');
const { createResourceRouter } = require('./resourceRoutes');

const router = createResourceRouter(tournamentController, { uploadFolder: 'tournaments' });

module.exports = router;
