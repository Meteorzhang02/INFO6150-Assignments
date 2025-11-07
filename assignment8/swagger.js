const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User Management API',
      version: '1.0.0',
      description: 'A secure RESTful API for user management with image upload functionality',
      contact: {
        name: 'API Support',
        email: 'support@example.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          required: ['fullName', 'email', 'password'],
          properties: {
            fullName: {
              type: 'string',
              description: 'Full name of the user'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email address of the user'
            },
            password: {
              type: 'string',
              format: 'password',
              description: 'Password (min 8 chars with uppercase, lowercase, digit, special char)'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Error message'
            },
            details: {
              type: 'array',
              items: {
                type: 'object'
              },
              description: 'Validation error details'
            }
          }
        }
      }
    }
  },
  // 明确指定包含Swagger注释的文件路径
  apis: ['./routes/*.js', './controllers/*.js', './app.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;