import swaggerJSDoc from 'swagger-jsdoc'

const options = {
  swaggerDefinition: {
    openapi: '3.0.3', // YOU NEED THIS
    info: {
      title: 'Piadas Secas',
      version: '1.0.0',
      description: 'Piadas Secas'
    },
    basePath: '/api/',
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  tags: [
    {
      name: 'Piadas',
      description: 'API for Piadas Secas'
    }
  ],
  // Path to the API docs
  apis: [
    'src/routes/piadas/index.js',
    'src/routes/users/index.js'
  ]
}

export default swaggerJSDoc(options)
