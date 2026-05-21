const { Pool } = require('pg');

// Si existe la variable DATABASE_URL (en internet), se conecta a Neon.
// Si no existe, se conecta a tu PostgreSQL local de tu computadora.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Esto es obligatorio para que Neon acepte la conexión segura SSL desde internet
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

module.exports = pool;