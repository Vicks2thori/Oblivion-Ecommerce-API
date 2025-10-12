//imagesDto.js
const Joi = require('joi');

const uploadImageSchema = Joi.object({
  name: Joi.string()
    .length(24)
    .hex()
    .required()
    .messages({
      'string.base': 'ID da entidade deve ser uma string',
      'string.length': 'ID da entidade deve ter exatamente 24 caracteres',
      'string.hex': 'ID da entidade deve ser um hexadecimal válido',
      'any.required': 'ID da entidade é obrigatório',
      'string.empty': 'ID da entidade é obrigatório'
    })
}).min(1).max(1);

const updateImageSchema = Joi.object({
  name: Joi.string()
    .length(24)
    .hex()
    .optional()
    .messages({
      'string.base': 'ID da entidade deve ser uma string',
      'string.length': 'ID da entidade deve ter exatamente 24 caracteres',
      'string.hex': 'ID da entidade deve ser um hexadecimal válido'
    })
}).max(1);


module.exports = {
  uploadImageSchema,
  updateImageSchema
};