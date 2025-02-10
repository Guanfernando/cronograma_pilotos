//backend/server.js

import express from 'express';
import { connectDB, sequelize } from './config/db.js';
import dotenv from 'dotenv';
import Pilot from './models/Pilot.js';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// Permitir peticiones desde React con CORS
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
})); 

// Función asíncrona para iniciar el servidor correctamente
const startServer = async () => {
    try {
        await connectDB(); // Conectar a la base de datos antes de sincronizar modelos

        await sequelize.sync({ force: false });
        console.log("✅ Tablas sincronizadas con la base de datos");

        // Iniciar el servidor después de sincronizar
        app.listen(PORT, () => {
            console.log(`✅ Servidor conectado en el puerto http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("❌ Error al iniciar el servidor:", error);
    }
};

// Endpoint para recibir los datos del formulario (frontend-PilotsForm)
app.post('/api/pilots', async (req, res) => {
    try {
        const { id, firstName, secondName } = req.body;
        const newPilot = await Pilot.create({ id, firstName, secondName });
        res.status(201).json(newPilot);
        console.log('✅ Registro creado con éxito:', newPilot);
    } catch (error) {  // Capturar el error correctamente
        console.error("❌ Error al crear el registro:", error);
        res.status(500).json({ message: 'Error al crear el registro', error: error.message });
    }
});

// Llamar la función para iniciar el servidor
startServer();
