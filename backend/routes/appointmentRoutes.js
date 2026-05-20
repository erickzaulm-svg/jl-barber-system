const express = require('express');
const router = express.Router();
const { agendarCita, obtenerCitas, checarDisponibilidad, eliminarCita, obtenerCitaPorId } = require('../controllers/appointmentController');

router.post('/', agendarCita);
router.get('/', obtenerCitas);
router.get('/check', checarDisponibilidad); 
router.delete('/:id', eliminarCita); 
router.get('/:id', obtenerCitaPorId); // <-- Nueva ruta para buscar por ID

module.exports = router;