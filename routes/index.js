module.exports = (app) => {
  const piadas = require('../controllers/paidas.controller');
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
  app.get('/piadas', piadas.findAll);
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
 *     parameters:
 *       - joke: user
 *         description: Piada Object
 *         in:  body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/Piada'
 *     responses:
 *       200:
 *         description: piadas
 *         schema:
 *           $ref: '#/definitions/Piada'
 */
  // Create a new Note
  app.post('/piadas', piadas.create);
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
 *           type: object
 *           items:
 *             $ref: '#/definitions/Piada'
 */
  // Retrieve random piada
  app.get('/piadaRandom', piadas.random);

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
 *           type: object
 *           items:
 *             $ref: '#/definitions/Piada'
 */
  // Retrieve a single Note with noteId
  app.get('/piadas/:piadaId', piadas.findOne);
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
 *       - name: piadaId
 *         in: path
 *         description: ID of piada to return
 *         required: true
 *         type: string
 *         format: string
 *         schema:
 *           $ref: '#/definitions/Piada'
 *     responses:
 *       204:
 *         description: iada
 * 
 */
  // Update a Note with noteId
  app.put('/piadas/:piadaId', piadas.update);
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
 *           $ref: '#/definitions/Piada'
 *     responses:
 *       200:
 *         description: piada delete
 */
  // Delete a Note with noteId
  app.delete('/piadas/:piadaId', piadas.delete);
}