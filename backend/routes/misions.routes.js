import express from "express";
import Mision from "../models/Mision.js";
import Pilot from "../models/Pilot.js";

const misionRouter = express.Router();

/**
 * @swagger
 * /api/mision:
 *   get:
 *     summary: Obtiene la lista de pilotos en una misión
 *     tags: [Misiones]
 *     responses:
 *       200:
 *         description: Lista de pilotos obtenida correctamente
 *       500:
 *         description: Error en el servidor
 */
misionRouter.get('/api/mision', async (req, res, next) => {
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
/**
 * @swagger
 * /api/mision:
 *   post:
 *     summary: Crea una nueva misión
 *     tags: [Misiones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               misionId:
 *                 type: integer
 *               misionDate:
 *                 type: string
 *                 format: date
 *               airplane:
 *                 type: string
 *               description:
 *                 type: string
 *               pilotId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Misión creada con éxito
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error en el servidor
 */
misionRouter.post('/api/mision', async (req,res, next) => {
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

export default misionRouter;
