// swagger-static.js - 静态Swagger配置
const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'User Management API',
    version: '1.0.0',
    description: 'Secure RESTful APIs for user management with Node.js, Express, and MongoDB',
    contact: {
      name: 'API Support',
      email: 'support@example.com'
    }
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server'
    }
  ],
  tags: [
    {
      name: 'Users',
      description: 'User management endpoints'
    }
  ],
  paths: {
    '/user/create': {
      post: {
        tags: ['Users'],
        summary: 'Create a new user',
        description: 'Create a new user with full name, email, and password',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['fullName', 'email', 'password'],
                properties: {
                  fullName: {
                    type: 'string',
                    example: 'John Doe',
                    description: 'Full name of the user (alphabetic characters only)'
                  },
                  email: {
                    type: 'string',
                    format: 'email',
                    example: 'john.doe@example.com',
                    description: 'Email address of the user'
                  },
                  password: {
                    type: 'string',
                    format: 'password',
                    example: 'Password123!',
                    description: 'Password (min 8 chars with uppercase, lowercase, digit, special char)'
                  }
                }
              }
            }
          }
        },
        responses: {
          201: {
            description: 'User created successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'User created successfully.'
                    },
                    user: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'string',
                          example: '507f1f77bcf86cd799439011'
                        },
                        fullName: {
                          type: 'string',
                          example: 'John Doe'
                        },
                        email: {
                          type: 'string',
                          example: 'john.doe@example.com'
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          400: {
            description: 'Validation failed',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: {
                      type: 'string',
                      example: 'Validation failed.'
                    },
                    details: {
                      type: 'array',
                      items: {
                        type: 'object'
                      }
                    }
                  }
                }
              }
            }
          },
          500: {
            description: 'Internal server error'
          }
        }
      }
    },
    '/user/edit': {
      put: {
        tags: ['Users'],
        summary: 'Update user details',
        description: 'Update user full name and/or password. Email cannot be updated.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email'],
                properties: {
                  email: {
                    type: 'string',
                    format: 'email',
                    example: 'john.doe@example.com',
                    description: 'Email address to identify the user'
                  },
                  fullName: {
                    type: 'string',
                    example: 'John Smith',
                    description: 'New full name (optional)'
                  },
                  password: {
                    type: 'string',
                    format: 'password',
                    example: 'NewPassword123!',
                    description: 'New password (optional)'
                  }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: 'User updated successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'User updated successfully.'
                    },
                    user: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'string',
                          example: '507f1f77bcf86cd799439011'
                        },
                        fullName: {
                          type: 'string',
                          example: 'John Smith'
                        },
                        email: {
                          type: 'string',
                          example: 'john.doe@example.com'
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          400: {
            description: 'Validation failed'
          },
          404: {
            description: 'User not found'
          }
        }
      }
    },
    '/user/delete': {
      delete: {
        tags: ['Users'],
        summary: 'Delete a user',
        description: 'Delete a user by email address',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email'],
                properties: {
                  email: {
                    type: 'string',
                    format: 'email',
                    example: 'john.doe@example.com',
                    description: 'Email address of the user to delete'
                  }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: 'User deleted successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'User deleted successfully.'
                    }
                  }
                }
              }
            }
          },
          404: {
            description: 'User not found'
          }
        }
      }
    },
    '/user/getAll': {
      get: {
        tags: ['Users'],
        summary: 'Get all users',
        description: 'Retrieve a list of all users with their details',
        responses: {
          200: {
            description: 'List of all users retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    users: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          fullName: {
                            type: 'string',
                            example: 'John Doe'
                          },
                          email: {
                            type: 'string',
                            example: 'john.doe@example.com'
                          },
                          password: {
                            type: 'string',
                            example: '$2a$10$hashedpassword...',
                            description: 'Hashed password as stored in database'
                          },
                          profileImage: {
                            type: 'string',
                            example: '/images/profile-123456789.jpg',
                            description: 'Path to profile image if uploaded'
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/user/uploadImage': {
      post: {
        tags: ['Users'],
        summary: 'Upload user profile image',
        description: 'Upload a profile image for a user (JPEG, PNG, GIF only)',
        requestBody: {
          required: true,
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                required: ['email', 'image'],
                properties: {
                  email: {
                    type: 'string',
                    format: 'email',
                    example: 'john.doe@example.com',
                    description: 'Email address of the user'
                  },
                  image: {
                    type: 'string',
                    format: 'binary',
                    description: 'Image file (JPEG, PNG, GIF)'
                  }
                }
              }
            }
          }
        },
        responses: {
          201: {
            description: 'Image uploaded successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'Image uploaded successfully.'
                    },
                    filePath: {
                      type: 'string',
                      example: '/images/filename.jpg'
                    }
                  }
                }
              }
            }
          },
          400: {
            description: 'Invalid file format or image already exists'
          },
          404: {
            description: 'User not found'
          }
        }
      }
    }
  },
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
            description: 'Password (min 8 characters with uppercase, lowercase, digit, special character)'
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
};

module.exports = swaggerDocument;