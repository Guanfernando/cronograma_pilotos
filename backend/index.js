//backend/index.js

import express from 'express';
import { connectDB, sequelize } from './config/db.js';
import dotenv from 'dotenv';

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

//conexion a la base de datos
connectDB()

//sincronizar modelos de la base de datos
sequelize.sync({force:false})
.then(() => ("✅ Tablas sincronizadas con la base de datos"))
.catch((err) => ("❌ Error al sincronizar las tablas"))

app.listen(PORT,() =>{
    console.log(`✅ Servidor conectado en el puerto http://localhost:${PORT}`);
})

