import express from 'express';
import Airplane from '../models/Airplane.js';

const airplanesRouter = express.Router();

airplanesRouter.post('/api/airplane', async (req, res, next) => {
  try {
    // Validación de datos recibidos
    const { airplaneId, airplaneType, airplaneModel } = req.body;
    
    if (!airplaneId || !airplaneType || !airplaneModel) {
      return res.status(400).json({ 
        error: 'Todos los campos son requeridos' 
      });
    }

    // Log para debug
    console.log('Datos recibidos:', req.body);

    const newAirplane = await Airplane.create({
      airplaneId,
      airplaneType,
      airplaneModel
    });

    console.log('Aeronave creada:', newAirplane);
    res.status(201).json(newAirplane);
  } catch (error) {
    console.error('Error al crear aeronave:', error);
    res.status(500).json({ 
      error: 'Error al crear la aeronave',
      details: error.message 
    });
  }
});

// Ruta GET para verificar las aeronaves existentes
airplanesRouter.get('/api/airplane', async (req, res, next) => {
  try {
    const airplanes = await Airplane.findAll();
    res.json(airplanes);
  } catch (error) {
    next(error);
  }
});


// ruta get para obtener aernave por ID
airplanesRouter.get('/api/airplane/:id', async (req,res,next) =>{
  try{
    const {id} = req.params;
    const airplane = await Airplane.findOne({ where: {airplaneid: id}});
    res.json(airplane);
  } catch (error){
    next(error);
  };
});

export default airplanesRouter;