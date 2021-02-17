import Router from 'express'
import {
  create,
  update,
  remove,
  findAll,
  findOne,
  random
} from '../../controllers/piadas.controller'
import auth from '../../midleware/authentication'

const piadas = Router()

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
 * /api/piadas:
 *   get:
 *     tags:
 *       - "Piadas"
 *     description: Returns piadas
 *     produces:
 *      - application/json
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: the name of category
 *     responses:
 *       200:
 *         description: Piadas
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Piada'
 */
// Retrieve all piadas
piadas.get('/', findAll)

/**
 * @swagger
 *
 * /api/piadas:
 *   post:
 *     security:              # <--- ADD THIS
 *       - bearerAuth: [read]     # <--- ADD THIS
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
 *         description: piada object
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
// Create a new Piada
piadas.post('/', auth, create)

/**
 * @swagger
 * /api/piadas/random:
 *   get:
 *     tags:
 *       - "Piadas"
 *     description: Returns piada
 *     produces:
 *      - application/json
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: the name of category
 *     responses:
 *       200:
 *         description: Piadas
 *         schema:
 *           $ref: '#/definitions/Piada'
 */
// Retrieve random piada
piadas.get('/random', random)

/**
 * @swagger
 * /api/piadas/{piadaId}:
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
piadas.get('/:piadaId', findOne)

/**
 * @swagger
 *
 * /api/piadas/{piadaId}:
 *   put:
 *     security:              # <--- ADD THIS
 *       - bearerAuth: [read]     # <--- ADD THIS
 *     tags:
 *       - "Piadas"
 *     description: Creates a user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Piada
 *         in: body
 *         description: piada object
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
piadas.put('/:piadaId', auth, update)

/**
 * @swagger
 *
 * /api/piadas/{piadaId}:
 *   delete:
 *     security:
 *       - bearerAuth: [admin]
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
piadas.delete('/:piadaId', auth, remove)

export default piadas
