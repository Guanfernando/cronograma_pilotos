//backend/server.js

import express from 'express';
import { connectDB, sequelize } from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerSpec from './docs/swagger.js';
import swaggerUi from "swagger-ui-express";
import pilotsRouter from './routes/pilots.routes.js';
import misionRouter from './routes/misions.routes.js';
import airplanesRouter from './routes/airplanes.routes.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

//
// Permitir peticiones desde React con CORS
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));


//documentacion con swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
console.log("Documentacion disponible en http://localhost:4000/api-docs")


//usar las rutas importadas
app.use(pilotsRouter);
app.use(misionRouter);
app.use(airplanesRouter);

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
        console.error(`❌ Error al iniciar el servidor en: http://localhost:${PORT}`, error);
    }
};


//manejo unico de errores
app.use((err,req,res, next) => {
    console.error("Error", err.message)
    res.status(err.status || 500).json({error: err.message})
    });
    
// Llamar la función para iniciar el servidor
startServer();
