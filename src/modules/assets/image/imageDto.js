//imageDto.js
//Opcional
//Se for manipulada diretamente (upload de imagens fora do produto)
const Joi = require('joi');

const createImageSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(), //no controlador que checa antes de criar
  patch: Joi.string().min(5).max(50).required(), //fazer um esquema para deixar os 2 unicos
});

module.exports = { createImageSchema };