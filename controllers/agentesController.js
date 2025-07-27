const { v4: uuidv4 } = require('uuid');
const repository = require('../repositories/agentesRepository');
const { validarAgente } = require('../utils/validators');

function getAll(req, res) {
    let agentes = repository.findAll();
    const { sort, cargo } = req.query;

    if (cargo) {
        agentes = agentes.filter(a => a.cargo === cargo);
    }

    if (sort === "dataDeIncorporacao") {
        agentes.sort((a, b) => new Date(a.dataDeIncorporacao) - new Date(b.dataDeIncorporacao));
    } else if (sort === "-dataDeIncorporacao") {
        agentes.sort((a, b) => new Date(b.dataDeIncorporacao) - new Date(a.dataDeIncorporacao));
    }

    res.json(agentes);
}


function getById(req, res) {
    const agente = repository.findById(req.params.id);
    if (!agente) return res.status(404).json({ message: "Agente não encontrado" });
    res.json(agente);
}

function create(req, res) {
    const erros = validarAgente(req.body);
    if (erros.length > 0) {
        return res.status(400).json({
            status: 400,
            message: "Parâmetros inválidos",
            errors: erros
        });
    }

    const novoAgente = {
        id: uuidv4(),
        ...req.body
    };

    res.status(201).json(repository.create(novoAgente));
}

function update(req, res) {
    const agente = repository.findById(req.params.id);
    if (!agente) return res.status(404).json({ message: "Agente não encontrado" });

    const erros = validarAgente(req.body);
    if (erros.length > 0) {
        return res.status(400).json({
            status: 400,
            message: "Parâmetros inválidos",
            errors: erros
        });
    }

    const updated = repository.update(req.params.id, req.body);
    res.json(updated);
}

function remove(req, res) {
    const deleted = repository.remove(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Agente não encontrado" });
    res.status(204).send();
}

module.exports = { getAll, getById, create, update, remove };
