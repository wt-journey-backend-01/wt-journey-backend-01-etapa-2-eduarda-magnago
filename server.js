const express = require('express');
const app = express();
const PORT = 3000;

// Middlewares
app.use(express.json());

// Rotas
const agentesRoutes = require('./routes/agentesRoutes');
const casosRoutes = require('./routes/casosRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./docs/swagger');

app.use('/agentes', agentesRoutes);
app.use('/casos', casosRoutes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(PORT, () => {
    console.log(`Servidor do Departamento de Polícia rodando em http://localhost:${PORT}`);
});