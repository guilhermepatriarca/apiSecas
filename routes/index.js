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
 * /piada/${piadaId}:
 *   get:
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
  // Retrieve a single Note with noteId
  app.get('/piadas/:piadaId', piadas.findOne);
/**
 * @swagger
 *
 * /piadas:
 *   put:
 *     description: Creates a user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: Piada Object
 *         in:  body
 *         required: true
 *         type: string
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
 * /piadas:
 *   delete:
 *     description: Delete a piada
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: Piada Object
 *         in:  body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/Piada'
 *     responses:
 *       200:
 *         description: piada delete
 */
  // Delete a Note with noteId
  app.delete('/piadas/:piadaId', piadas.delete);
}