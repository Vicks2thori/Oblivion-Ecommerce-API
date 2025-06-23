//imageDto.js
//Opcional
//Se for manipulada diretamente (upload de imagens fora do produto)
const Joi = require('joi');

const createImageSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(), //no controlador que checa antes de criar
  patch: Joi.string().min(5).max(100).required(), //fazer um esquema para deixar os 2 unicos
});

const updateImageSchema = Joi.object({
  name: Joi.string().min(3).max(50).optional(),
  patch: Joi.string().min(5).max(100).optional(),
});

module.exports = { 
  createImageSchema, 
  updateImageSchema };