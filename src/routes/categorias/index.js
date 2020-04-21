import { Router } from 'express'
import categoriasController from '../../controllers/categorias.controller'
const categorias = Router()

export default () => {
/**
 * @swagger
 *
 * definitions:
 *   Categoria:
 *     type: object
 *     required:
 *       - joke
 *     properties:
 *       category:
 *         type: array
 *         items:
 *           type: string
 *
 */

  /**
 * @swagger
 * /categorias:
 *   get:
 *     tags:
 *       - "Categorias"
 *     description: Returns piadas
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: All Categorias
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Categoria'
 */
  // Retrieve all piadas
  categorias.get('/', categoriasController.findAll)
  /**
 * @swagger
 *
 * /categorias:
 *   post:
 *     tags:
 *       - "Categorias"
 *     description: Creates Categoria
 *     produces:
 *       - application/json
 *     content:
 *       application/json:
 *         schema:
 *           $ref: '#/definitions/Categoria'
 *     parameters:
 *       - name: Piada
 *         in: body
 *         description: paida object
 *         required: true
 *         schema:
 *          $ref: '#/definitions/Categoria'
 *          minimum: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             oneOf:
 *               $ref: '#/definitions/Categoria'
 *     responses:
 *       200:
 *         description: piadas
 *         schema:
 *           $ref: '#/definitions/Categoria'
 */
  // Retrieve a single Note with noteId
  categorias.get('/:piadaId', categoriasController.findOne)
}
