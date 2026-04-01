const express = require('express');
const cors = require('cors');

// Inicializamos la app
const app = express();
const pool = require('./db');
// Middlewares (Configuraciones de seguridad y formato)
app.use(cors()); // Permite que el frontend se comunique con este backend
app.use(express.json()); // Permite leer datos en formato JSON
// --- RUTAS DE LA API ---
const serviceRoutes = require('./routes/serviceRoutes');
app.use('/api/services', serviceRoutes);
// -----------------------
// Ruta de prueba
app.get('/', (req, res) => {
    res.send('¡Bienvenido a la API de JL Barber!');
});

// Definimos el puerto y encendemos el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🔥 Servidor de JL Barber corriendo en el puerto ${PORT}`);
});