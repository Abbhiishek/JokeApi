const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'My Joke API',
        description: 'THIS IS A VERY COOL APP THAT TELLS YOU JOKES',
        version: '1.0.0',

    },
    host: 'https://joke-api-nine.vercel.app/',
    securityDefinitions: {
        apiKeyAuth: {
            type: 'apiKey',
            in: 'header', // can be 'header', 'query' or 'cookie'
            name: 'X-API-KEY', // name of the header, query parameter or cookie
            description: 'login with your api key to access the jokes'
        }
    }
};

const outputFile = './swagger.json';
const routes = ['./index.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);