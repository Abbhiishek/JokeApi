const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const doc = {
    info: {
        title: 'My Joke API',
        description: 'THIS IS A VERY COOL APP THAT TELLS YOU JOKES',
        version: '1.0.0',

    },
    securityDefinitions: {
        bearerAuth: {
            type: 'http',
            scheme: 'bearer'
        }
    }
};

const outputFile = './swagger.json';
const routes = ['./index.js'];



swaggerAutogen(outputFile, routes, doc);