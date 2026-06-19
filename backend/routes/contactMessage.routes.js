const express = require('express');
const { create, getAll, markRead, remove } = require('../controllers/contactMessage.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/', create); // público - formulario de contacto
router.get('/', protect, getAll);
router.patch('/:id/read', protect, markRead);
router.delete('/:id', protect, remove);

module.exports = router;
