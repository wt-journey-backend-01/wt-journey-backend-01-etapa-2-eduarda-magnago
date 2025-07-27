const repository = require('../repositories/casosRepository');
const agentesRepository = require('../repositories/agentesRepository');
const { validarCaso } = require('../utils/validators');

exports.getAllCasos = (req, res) => {
  res.json(repository.findAll());
};

exports.getCasoById = (req, res) => {
  const caso = repository.findById(req.params.id);
  if (!caso) {
    return res.status(404).json({ message: 'Caso não encontrado' });
  }
  res.json(caso);
};

exports.createCaso = (req, res) => {
  const erros = validarCaso(req.body, agentesRepository);
  if (erros.length > 0) {
    return res.status(400).json({
      status: 400,
      message: "Parâmetros inválidos",
      errors: erros
    });
  }

  const novoCaso = repository.create(req.body);
  res.status(201).json(novoCaso);
};

exports.updateCaso = (req, res) => {
  const casoExistente = repository.findById(req.params.id);
  if (!casoExistente) {
    return res.status(404).json({ message: 'Caso não encontrado' });
  }

  const erros = validarCaso(req.body, agentesRepository);
  if (erros.length > 0) {
    return res.status(400).json({
      status: 400,
      message: "Parâmetros inválidos",
      errors: erros
    });
  }

  const atualizado = repository.update(req.params.id, req.body);
  res.json(atualizado);
};

exports.partialUpdateCaso = (req, res) => {
  const atualizado = repository.partialUpdate(req.params.id, req.body);
  if (!atualizado) {
    return res.status(404).json({ message: 'Caso não encontrado' });
  }
  res.json(atualizado);
};

exports.deleteCaso = (req, res) => {
  const removido = repository.delete(req.params.id);
  if (!removido) {
    return res.status(404).json({ message: 'Caso não encontrado' });
  }
  res.status(204).send();
};


exports.getAllCasos = (req, res) => {
  const { status, agente_id, q } = req.query;
  let casos = repository.findAll();

  if (status) {
    casos = casos.filter(c => c.status === status);
  }

  if (agente_id) {
    casos = casos.filter(c => c.agente_id === agente_id);
  }

  if (q) {
    const termo = q.toLowerCase();
    casos = casos.filter(c =>
      c.titulo.toLowerCase().includes(termo) ||
      c.descricao.toLowerCase().includes(termo)
    );
  }

  res.json(casos);
};

exports.getAgenteDoCaso = (req, res) => {
  const caso = repository.findById(req.params.id);
  if (!caso) return res.status(404).json({ message: "Caso não encontrado" });

  const agente = agentesRepository.findById(caso.agente_id);
  if (!agente) return res.status(404).json({ message: "Agente não encontrado" });

  res.json(agente);
};