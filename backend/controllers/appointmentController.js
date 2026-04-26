const pool = require('../db');

// 1. GUARDAR CITA
const agendarCita = async (req, res) => {
  try {
    const { sucursal, servicio, barbero, fecha, hora } = req.body;
    const nuevaCita = await pool.query(
      "INSERT INTO citas (sucursal, servicio, barbero, fecha, hora) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [sucursal, servicio, barbero, fecha, hora]
    );
    res.status(201).json({ mensaje: "¡Cita guardada!", cita: nuevaCita.rows[0] });
  } catch (error) {
    res.status(500).json({ error: "Error al guardar" });
  }
};

// 2. LEER CITAS (Dashboard)
const obtenerCitas = async (req, res) => {
  try {
    const todasLasCitas = await pool.query("SELECT * FROM citas ORDER BY fecha ASC, hora ASC");
    res.json(todasLasCitas.rows);
  } catch (error) {
    res.status(500).json({ error: "Error al leer" });
  }
};

// 3. VERIFICAR DISPONIBILIDAD
const checarDisponibilidad = async (req, res) => {
  try {
    const { fecha, barbero } = req.query; 
    const citas = await pool.query("SELECT hora FROM citas WHERE DATE(fecha) = $1 AND barbero = $2", [fecha, barbero]);
    const horasOcupadas = citas.rows.map(cita => cita.hora);
    res.json(horasOcupadas);
  } catch (error) {
    res.status(500).json({ error: "Error al checar horarios" });
  }
};

// 4. ELIMINAR CITA (¡NUEVA!)
const eliminarCita = async (req, res) => {
  try {
    const { id } = req.params; // Atrapamos el ID que nos manda el frontend
    await pool.query("DELETE FROM citas WHERE id = $1", [id]); // Lo borramos de la base de datos
    res.json({ mensaje: "Cita cancelada y horario liberado" });
  } catch (error) {
    console.error("Error al borrar:", error);
    res.status(500).json({ error: "Error al intentar borrar la cita" });
  }
};

// Exportamos las cuatro funciones
module.exports = { agendarCita, obtenerCitas, checarDisponibilidad, eliminarCita };