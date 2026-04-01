const express = require('express');
const router = express.Router();
const { getServices, createService } = require('../controllers/serviceController');

// Cuando el frontend visite estas URLs, ejecutará las funciones
router.get('/', getServices);
router.post('/', createService);

module.exports = router;