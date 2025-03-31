//backend/config/db.js

//establecer conexion con la base de datos
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();


const sequelize = new Sequelize (
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 5000,
        dialect: 'postgres',
        logging: false,
    });

const connectDB = async () =>{
    try {
        await sequelize.authenticate();
        console.log('✅ Conectado a la base de datos');
        process.env.DB_CONNECTED = true;
        } catch (error) {
            console.error(error, '❌ Error al conectar a la base de datos');
            process.env.DB_CONNECTED = false;
            return false;
            }
}


export {connectDB, sequelize};
