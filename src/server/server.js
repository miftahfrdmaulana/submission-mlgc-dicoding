require('dotenv').config();
const Hapi = require('@hapi/hapi');
const routes = require('./routes');
const loadModel = require('../services/loadModel');
const InputError = require('../exceptions/InputError');
const TooLargeFile  = require('../exceptions/TooLargeFile');

(async () => {
    const server = Hapi.server({
        port: process.env.PORT || 8080,
        host: '0.0.0.0',
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    const model = await loadModel();
    server.app.model = model;

    server.route(routes);

    //extension onPreResponse:
    server.ext('onPreResponse', function(request, h) {
        const response = request.response;

        if(response instanceof InputError || response instanceof TooLargeFile){
            const newResponse = h.response({
                status:'fail',
                message: response.message
            })
            newResponse.code(response.statusCode);
            return newResponse;
        }

        if(response.isBoom){
            const newResponse = h.response({
                status: 'fail',
                message: response.message
            })
            newResponse.code(response.output.statusCode);
            return newResponse;
        }

        return h.continue
    })

    await server.start();
    console.log(`Server starting at ${server.info.uri}`);
})();
