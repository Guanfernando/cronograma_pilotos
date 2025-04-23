import express from "express";
import { Op, fn, col, where } from "sequelize";
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



//ruta para obtener piloto por nombre


pilotsRouter.get("/api/pilotsList/:name", async (req, res, next) => {
    try {
        const name = req.params.name.toLowerCase();

        const pilots = await Pilot.findAll({
            where: where(
                fn("LOWER", fn("CONCAT",
                    col("firstname"), " ",
                    col("secondname"), " ",
                    col("firstlastname"), " ",
                    col("secondlastname")
                )),
                {
                    [Op.like]: `%${name}%`
                }
            )
        });

        if (pilots.length === 0) {
            return res.status(404).json({ message: "No se encontraron coincidencias" });
        }

        res.json(pilots);
    } catch (error) {
        next(error);
    }
});




export default pilotsRouter;
