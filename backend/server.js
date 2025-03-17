//backend/server.js

import express from 'express';
import { connectDB, sequelize } from './config/db.js';
import dotenv from 'dotenv';
import Pilot from './models/Pilot.js';
import Mision from './models/Mision.js';
import cors from 'cors';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from "swagger-ui-express";

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

//manejo unico de errores
app.use((err,req,next,res) => {
console.error("Error", err.message)
res.status(err.status || 500).json({error:err.message})
})


//documentacion del uso de API REstfull con swagger
const swaggerOptions ={
    definition:{
        openapi:"3.0.0",
        info: {tittle: "API Pilotos", version:"1.0.0" },
    },
    apis: ["./server.js"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

console.log("Documentacion disponible en http://localhost:4000/api-docs")


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
        const newPilot = await Pilot.create(req.body);
        res.status(201).json(newPilot);
        console.log(req.body);
        console.log('✅ Registro creado con éxito:', newPilot);
    } catch (error) { 
       next(error);
    }
});


// Ruta GET para listar todos los pilotos
app.get('/api/pilotslist', async (req, res) => {
    try {
        const pilots = await Pilot.findAll({
            order: [['id', 'ASC']]
        });
        res.json(pilots);
    } catch (error) {
        next(error)
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
        next(error)
    }

});

app.post('/api/mision', async (req,res) => {
    try {
        const {misionId, misionDate, airplane, description, pilotId} = req.body;
        if (!misionId || !misionDate || !airplane) {
            return res.status(400).json({ message: "Todos los registros son obligatorios"})
        }
        const newMision = await Mision.create({ misionId, misionDate, airplane, description, pilotId});
        res.status(201).json(newMision);
        console.log("✅ Misión registrada:", newMision);
    } catch (error) {
       next(error);
    }
});
    
// Llamar la función para iniciar el servidor
startServer();
