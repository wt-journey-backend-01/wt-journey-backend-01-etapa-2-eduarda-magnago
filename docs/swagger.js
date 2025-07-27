const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Departamento de Polícia',
            version: '1.0.0',
            description: 'Gerenciamento de agentes e casos'
        },
    },
    apis: ['./routes/*.js'], // Pode apontar para mais arquivos
};

const specs = swaggerJsdoc(options);
module.exports = specs;
