const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation Clone X',
      version: '1.0.0',
      description: 'Documentation for the Clone X project',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        
      },
    },
  },
  apis: [
    './src/infrastructure/express/routes/*.js',
    './src/adapters/controllers/*.js',
  ],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

const swaggerDocs = (app, port) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`Version 1 Docs are available at http://localhost:${port}/api-docs`);
};

module.exports = swaggerDocs;
