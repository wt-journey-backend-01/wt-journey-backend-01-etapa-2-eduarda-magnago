const { v4: uuidv4 } = require('uuid');

let casos = [];

exports.findAll = () => {
  return casos;
};

exports.findById = (id) => {
  return casos.find(caso => caso.id === id);
};

exports.create = (data) => {
  const novoCaso = { id: uuidv4(), ...data };
  casos.push(novoCaso);
  return novoCaso;
};

exports.update = (id, data) => {
  const index = casos.findIndex(caso => caso.id === id);
  if (index === -1) return null;
  casos[index] = { id, ...data };
  return casos[index];
};

exports.partialUpdate = (id, data) => {
  const index = casos.findIndex(caso => caso.id === id);
  if (index === -1) return null;
  casos[index] = { ...casos[index], ...data };
  return casos[index];
};

exports.delete = (id) => {
  const index = casos.findIndex(caso => caso.id === id);
  if (index === -1) return null;
  casos.splice(index, 1);
  return true;
};
