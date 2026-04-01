const pool = require('../db');

// Función para obtener todos los servicios
const getServices = async (req, res) => {
    try {
        const allServices = await pool.query('SELECT * FROM services');
        res.json(allServices.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Error del servidor' });
    }
};

// Función para crear un nuevo servicio
const createService = async (req, res) => {
    try {
        const { name, description, price, duration_minutes } = req.body;
        const newService = await pool.query(
            'INSERT INTO services (name, description, price, duration_minutes) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, description, price, duration_minutes]
        );
        res.json(newService.rows[0]); // Devuelve el servicio recién creado
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Error del servidor' });
    }
};

module.exports = { getServices, createService };