const { Pool } = require('pg');
require('dotenv').config(); // Carga las contraseñas del archivo .env

// Configuramos la conexión
const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
});

// Probamos que funcione
pool.connect()
    .then(() => console.log('✅ Base de datos de JL Barber conectada con éxito'))
    .catch((err) => console.error('❌ Error al conectar la base de datos', err.stack));

module.exports = pool;