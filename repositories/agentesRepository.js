const agentes = [];

function findAll() {
    return agentes;
}

function findById(id) {
    return agentes.find(agente => agente.id === id);
}

function create(agente) {
    agentes.push(agente);
    return agente;
}

function update(id, updatedData) {
    const index = agentes.findIndex(agente => agente.id === id);
    if (index === -1) return null;
    agentes[index] = { ...agentes[index], ...updatedData };
    return agentes[index];
}

function remove(id) {
    const index = agentes.findIndex(agente => agente.id === id);
    if (index === -1) return false;
    agentes.splice(index, 1);
    return true;
}

module.exports = { findAll, findById, create, update, remove };