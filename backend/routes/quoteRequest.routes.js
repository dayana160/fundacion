const express = require('express');
const { create, getAll, markRead, remove } = require('../controllers/quoteRequest.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/', create); // público - botón "Cotiza con nosotros"
router.get('/', protect, getAll);
router.patch('/:id/read', protect, markRead);
router.delete('/:id', protect, remove);

module.exports = router;
