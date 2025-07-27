const express = require('express');
const router = express.Router();
const controller = require('../controllers/casosController');

// Rotas
router.get('/', controller.getAllCasos);
router.get('/:id', controller.getCasoById);
router.post('/', controller.createCaso);
router.put('/:id', controller.updateCaso);
router.patch('/:id', controller.partialUpdateCaso);
router.delete('/:id', controller.deleteCaso);

module.exports = router;

router.get('/:id/agente', controller.getAgenteDoCaso);