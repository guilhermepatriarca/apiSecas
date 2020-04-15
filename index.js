const express = require("express")
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()
const app = express()
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const port = process.env.PORT || 5000
const database = process.env.DATABASE


const options = {
    definition: {
      info: {
        title: 'API Piadas Secas', // Title (required)
        version: '1.0.0', // Version (required)
      },
    },
    // Path to the API docs
    apis: ['./routes/index.js'],
  };
  
  // Initialize swagger-jsdoc -> returns validated swagger spec in json format
  const swaggerSpec = swaggerJSDoc(options);

// middleware
// adding Helmet to enhance your API's security
app.use(helmet())

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Configuring the database
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(database, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit()
});

// enabling CORS for all requests
app.use(cors())

// adding morgan to log HTTP requests
app.use(morgan('combined'))

// Require Notes routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
require('./routes/index')(app)

app.listen(port, () => {
 console.log(`Server running on port ${port}`);
})