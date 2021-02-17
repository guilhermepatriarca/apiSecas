import Router from 'express'
import authentication from '../../midleware/authentication'
import authorization from '../../midleware/authorization'
import { login, create, all, logout, changePremissions, remove } from '../../controllers/users.controller'

const users = Router()

/**
 * @swagger
 *
 * definitions:
 *   CreateUser:
 *     type: object
 *     required:
 *       - name
 *       - email
 *       - password
 *     properties:
 *       name:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 *   User:
 *     type: object
 *     required:
 *       - email
 *       - password
 *     properties:
 *       email:
 *         type: string
 *       password:
 *         type: string
 *
 */

// Create a new User
/**
 * @swagger
 * /api/users:
 *   post:
 *     tags:
 *       - "User"
 *     description: Create User
 *     produces:
 *      - application/json
 *     content:
 *       application/json:
 *         schema:
 *           $ref: '#/definitions/CreateUser'
 *     parameters:
 *       - name: User
 *         in: body
 *         description: create user object
 *         required: true
 *         schema:
 *          $ref: '#/definitions/CreateUser'
 *          minimum: 1
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: information user
 *         schema:
 *           type: object
 *           items:
 *             $ref: '#/definitions/CreateUser'
 */
users.post('/', create, async (req, res) => {
  // View logged in user profile
  const { name, email, role } = req.user
  res.send({ name, email, role })
})
/**
 * @swagger
 * /api/users/login:
 *   post:
 *     tags:
 *       - "User"
 *     description: Login user
 *     produces:
 *      - application/json
 *     content:
 *       application/json:
 *         schema:
 *           $ref: '#/definitions/User'
 *     parameters:
 *       - name: User
 *         in: body
 *         description: user login object
 *         required: true
 *         schema:
 *          $ref: '#/definitions/User'
 *          minimum: 1
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: information user
 *         schema:
 *           type: object
 *           items:
 *             $ref: '#/definitions/User'
 *       401:
 *         description: error information
 *         schema:
 *           type: object
 */
// Login User
users.post('/login', login)
/**
 * @swagger
 * /api/users/me:
 *   get:
 *     security:
 *       - bearerAuth: [admin]
 *     tags:
 *       - "User"
 *     description: Get information about user
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: information user
 *         schema:
 *           type: object
 *           items:
 *             $ref: '#/definitions/User'
 */
// Get information about user
users.get('/me', authentication, async (req, res) => {
  // View logged in user profile
  const { name, email, role } = req.user
  res.send({ name, email, role })
})

/**
 * @swagger
 * /api/users/all:
 *   get:
 *     security:
 *       - bearerAuth: [admin]
 *     tags:
 *       - "User"
 *     description: Get information about all users
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: information user
 *         schema:
 *           type: object
 *           items:
 *             $ref: '#/definitions/User'
 */
// Get information about all users
users.get('/all', all)

/**
 * @swagger
 * /api/users/logout:
 *   post:
 *     security:
 *       - bearerAuth: [read]
 *     tags:
 *       - "User"
 *     description: logout user
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: information user
 *         schema:
 *           type: object
 *           items:
 *             $ref: '#/definitions/User'
 */
// Get information about all users
// Logout user
users.post('/me/logout', authentication, logout)

users.put('/:id', authentication, changePremissions)

users.delete('/:id', authentication, authorization('admin'), remove)

export default users
