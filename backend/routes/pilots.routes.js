import express from "express";
import Pilot from "../models/Pilot.js";

const pilotsRouter = express.Router();

//informacion pasada a swagger para documenta la api

/**
 * @swagger
 * /api/pilots:
 *   post:
 *     summary: Crea un nuevo piloto
 *     tags: [Pilots]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               firstName:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Piloto creado con éxito
 *       500:
 *         description: Error en el servidor
 */


pilotsRouter.post("/api/pilots", async (req, res, next) => {
    try {
        const newPilot = await Pilot.create(req.body);
        res.status(201).json(newPilot);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /api/pilotslist:
 *   get:
 *     summary: Obtiene la lista de pilotos
 *     tags: [Pilots]
 *     responses:
 *       200:
 *         description: Lista de pilotos obtenida correctamente
 *       500:
 *         description: Error en el servidor
 */


pilotsRouter.get("/api/pilotslist", async (req, res, next) => {
    try {
        const pilots = await Pilot.findAll({ order: [["id", "ASC"]] });
        res.json(pilots);
    } catch (error) {
        next(error);
    }
});

export default pilotsRouter;
