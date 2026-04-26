const express = require('express');
const router = express.Router();
// Importamos la nueva función de eliminarCita
const { agendarCita, obtenerCitas, checarDisponibilidad, eliminarCita } = require('../controllers/appointmentController');

router.post('/', agendarCita);
router.get('/', obtenerCitas);
router.get('/check', checarDisponibilidad); 
router.delete('/:id', eliminarCita); // <-- Nueva ruta para borrar pasándole el ID

module.exports = router;