import swaggerJSDoc from 'swagger-jsdoc'

const options = {
  definition: {
    info: {
      title: 'API Piadas Secas', // Title (required)
      version: '1.0.0' // Version (required)
    }
  },
  tags: [
    {
      name: 'Piadas',
      description: 'API for piadas in the system'
    }
  ],
  // Path to the API docs
  apis: ['src/routes/piadas/index.js']
}

export default swaggerJSDoc(options)
