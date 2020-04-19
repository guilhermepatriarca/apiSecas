import { Router } from 'express'
import categoriasController from '../../controllers/categorias.controller'
const categorias = Router()

export default () => {
/**
 * @swagger
 *
 * definitions:
 *   Piada:
 *     type: object
 *     required:
 *       - joke
 *     properties:
 *       joke:
 *         type: string
 *       response:
 *         type: string
 *       category:
 *         type: array
 *         items:
 *           type: string
 *
 */

  /**
 * @swagger
 * /piadas:
 *   get:
 *     tags:
 *       - "Categorias"
 *     description: Returns piadas
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: Piadas
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Piada'
 */
  // Retrieve all piadas
  categorias.get('/', categoriasController.findAll)
  /**
 * @swagger
 *
 * /piadas:
 *   post:
 *     tags:
 *       - "Categorias"
 *     description: Creates piada
 *     produces:
 *       - application/json
 *     content:
 *       application/json:
 *         schema:
 *           $ref: '#/definitions/Piada'
 *     parameters:
 *       - name: Piada
 *         in: body
 *         description: paida object
 *         required: true
 *         schema:
 *          $ref: '#/definitions/Piada'
 *          minimum: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             oneOf:
 *               $ref: '#/definitions/Piada'
 *     responses:
 *       200:
 *         description: piadas
 *         schema:
 *           $ref: '#/definitions/Piada'
 */
  // Retrieve a single Note with noteId
  categorias.get('/:piadaId', categoriasController.findOne)
}
