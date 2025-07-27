const { validate: isUuid } = require('uuid');

function validarAgente(agente) {
    const errors = [];

    if (!agente.nome) {
        errors.push({ nome: "O campo 'nome' é obrigatório" });
    }

    const dataRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!agente.dataDeIncorporacao || !dataRegex.test(agente.dataDeIncorporacao)) {
        errors.push({ dataDeIncorporacao: "Campo dataDeIncorporacao deve seguir a formatação 'YYYY-MM-DD'" });
    }

    const cargosPermitidos = ["delegado", "inspetor"];
    if (!agente.cargo || !cargosPermitidos.includes(agente.cargo)) {
        errors.push({ cargo: "Cargo deve ser 'delegado' ou 'inspetor'" });
    }

    return errors;
}

function validarCaso(caso, agentesRepository) {
    const errors = [];

    if (!caso.titulo) errors.push({ titulo: "Campo 'titulo' é obrigatório" });
    if (!caso.descricao) errors.push({ descricao: "Campo 'descricao' é obrigatório" });

    if (!["aberto", "solucionado"].includes(caso.status)) {
        errors.push({ status: "O campo 'status' pode ser somente 'aberto' ou 'solucionado'" });
    }

    if (!isUuid(caso.agente_id)) {
        errors.push({ agente_id: "agente_id deve ser um UUID válido" });
    } else {
        const agenteExiste = agentesRepository.findById(caso.agente_id);
        if (!agenteExiste) {
            errors.push({ agente_id: "Agente não encontrado para o agente_id informado" });
        }
    }

    return errors;
}

module.exports = {
    validarAgente,
    validarCaso,
};
