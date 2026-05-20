const pool = require('../db');

// 1. GUARDAR CITA
const agendarCita = async (req, res) => {
  try {
    const { sucursal, servicio, barbero, fecha, hora } = req.body;
    const nuevaCita = await pool.query(
      "INSERT INTO citas (sucursal, servicio, barbero, fecha, hora) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [sucursal, servicio, barbero, fecha, hora]
    );
    res.status(201).json({ 
      mensaje: `¡Cita guardada con éxito! Tu ID de cita es: ${nuevaCita.rows[0].id}. Guardalo para consultar o cancelar.`, 
      cita: nuevaCita.rows[0] 
    });
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

// 4. ELIMINAR CITA
const eliminarCita = async (req, res) => {
  try {
    const { id } = req.params; 
    await pool.query("DELETE FROM citas WHERE id = $1", [id]); 
    res.json({ mensaje: "Cita cancelada y horario liberado" });
  } catch (error) {
    res.status(500).json({ error: "Error al intentar borrar la cita" });
  }
};

// 5. BUSCAR UNA CITA POR ID (¡NUEVA!)
const obtenerCitaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await pool.query("SELECT * FROM citas WHERE id = $1", [id]);

    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: "No se encontró ninguna cita con ese ID." });
    }

    res.json(resultado.rows[0]);
  } catch (error) {
    console.error("Error al buscar cita:", error);
    res.status(500).json({ error: "Error en el servidor al buscar la cita" });
  }
};

module.exports = { agendarCita, obtenerCitas, checarDisponibilidad, eliminarCita, obtenerCitaPorId };