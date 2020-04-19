import { Router } from 'express'
import piadasController from '../../controllers/paidas.controller'
const piadas = Router()

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
 *       - "Piadas"
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
  piadas.get('/', piadasController.findAll)
  /**
 * @swagger
 *
 * /piadas:
 *   post:
 *     tags:
 *       - "Piadas"
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
  // Create a new Note
  piadas.post('/all', piadasController.create)
  /**
 * @swagger
 * /piadaRandom:
 *   get:
 *     tags:
 *       - "Piadas"
 *     description: Returns piada
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: Piadas
 *         schema:
 *           $ref: '#/definitions/Piada'
 */
  // Retrieve random piada
  piadas.get('/random', piadasController.random)

  /**
 * @swagger
 * /piadas/{piadaId}:
 *   get:
 *     tags:
 *       - "Piadas"
 *     description: Returns piada
 *     produces:
 *      - application/json
 *     parameters:
 *       - name: piadaId
 *         in: path
 *         description: ID of piada to return
 *         required: true
 *         type: string
 *         format: string
 *     responses:
 *       200:
 *         description: Piadas
 *         schema:
 *           $ref: '#/definitions/Piada'
 */
  // Retrieve a single Note with noteId
  piadas.get('/:piadaId', piadasController.findOne)
  /**
 * @swagger
 *
 * /piadas/{piadaId}:
 *   put:
 *     tags:
 *       - "Piadas"
 *     description: Creates a user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Piada
 *         in: body
 *         description: paida object
 *         required: true
 *         schema:
 *          $ref: '#/definitions/Piada'
 *          minimum: 1
 *     responses:
 *       204:
 *         description: piada
 *
 */
  // Update a Note with noteId
  piadas.put('/:piadaId', piadasController.update)
  /**
 * @swagger
 *
 * /piadas/{piadaId}:
 *   delete:
 *     tags:
 *       - "Piadas"
 *     description: Delete a piada
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: piadaId
 *         in: path
 *         description: ID of piada to return
 *         required: true
 *         type: string
 *         format: string
 *         schema:
 *           oneOf:
 *             $ref: '#/definitions/Piada'
 *     responses:
 *       200:
 *         description: ok
 */
  // Delete a Note with noteId
  piadas.delete('/:piadaId', piadasController.remove)
}
