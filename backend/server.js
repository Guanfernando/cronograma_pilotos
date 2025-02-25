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
            console.log(`✅ Servidor conectado en el puerto http://192.168.10.19:${PORT}`);
        });
    } catch (error) {
        console.error("❌ Error al iniciar el servidor:", error);
    }
};

// Endpoint para recibir los datos del formulario (frontend-PilotsForm)
app.post('/api/pilots', async (req, res) => {
    try {
        const { idType, id, firstName, secondName, firstLastName, secondLastName, email, telephoneNumber, city, address, birthday, rh, weight, eps, emergencyContact, emergencyNumber } = req.body;
        const newPilot = await Pilot.create({ idType, id, firstName, secondName, firstLastName, secondLastName, email, telephoneNumber, city, address, birthday,  rh, weight, eps , emergencyContact, emergencyNumber });
        res.status(201).json(newPilot);
        console.log(req.body);
        console.log('✅ Registro creado con éxito:', newPilot);
    } catch (error) {  // Capturar el error correctamente
        console.error("❌ Error al crear el registro:", error);
        res.status(500).json({ message: 'Error al crear el registro', error: error.message });
    }
});


// Ruta GET para listar todos los pilotos
app.get('/api/pilotslist', async (req, res) => {
    try {
        const pilots = await Pilot.findAll({
            order: [['id', 'ASC']]
        });
        console.log('✅ Pilotos encontrados:', pilots.length); // Log para debugging
        res.json(pilots);
    } catch (error) {
        console.error("❌ Error obteniendo los datos:", error);
        res.status(500).json({ error: 'Error al obtener los registros' });  
    }
});


//ruta GET para obtener pilotos en la mision
app.get('/api/mision', async (req, res) => {
    try {
        const pilots = await Pilot.findAll({
            order: [['firstName', 'ASC']],
            });        
        console.log('✅ Pilotos encontrados:', pilots.length); // Log para debugging
        res.json(pilots);
    } catch (error) {
        console.error("❌ Error obteniendo los datos:", error);
        res.status(500).json({ error: 'Error al obtener los registros' });  
    }
});

// Llamar la función para iniciar el servidor
startServer();
