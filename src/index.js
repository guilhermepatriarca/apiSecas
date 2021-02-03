import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express'
import '@babel/polyfill'

import routes from './routes'
import sawggerConfig from './swaggerConfig'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000
const database = process.env.DATABASE

// middleware
// adding Helmet to enhance your API's security
app.use(helmet())

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Configuring the database
const mongoose = require('mongoose')

mongoose.Promise = global.Promise

// Connecting to the database
mongoose.connect(database, {
  useNewUrlParser: true
}).then(() => {
  console.log('Successfully connected to the database')
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err)
  process.exit()
})

// enabling CORS for all requests
app.use(cors())

// adding morgan to log HTTP requests
app.use(morgan('combined'))

// Require Notes routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(sawggerConfig))
// API
app.use('/api', routes)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
