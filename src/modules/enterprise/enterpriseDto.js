//enterpriseDto.js
const Joi = require('joi');

const createEnterpriseSchema = Joi.object({
  nameEnterprise: Joi.string()
  .min(3)
  .max(50)
  .required()
  .messages({
    'string.base': 'Nome da empresa deve ser uma string',
    'string.min': 'Nome da empresa deve ter no mínimo 5 caracteres',
    'string.max': 'Nome da empresa deve ter no máximo 50 caracteres',
    'string.empty': 'Nome da empresa é obrigatório',
    'any.required': 'Nome da empresa é obrigatório'
  }),

  logoUrl: Joi.string()
  .uri({ scheme: ['http', 'https'] })
  .min(5)
  .max(255)
  .required()
  .messages({
    'string.uri': 'logoUrl deve ser uma Url valida',
    'string.base': 'logoUrl deve ser uma string',
    'string.min': 'logoUrl deve ter no mínimo 5 caracteres',
    'string.max': 'logoUrl deve ter no máximo 255 caracteres',
    'string.empty': 'logoUrl é obrigatório',
    'any.required': 'logoUrl é obrigatório'
  }),

  cell: Joi.string()
  .length(11)
  .required()
  .messages({
    'string.length': 'Celular deve ter exatamente 11 caracteres',
    'string.empty': 'Celular é obrigatório',
    'any.required': 'Celular é obrigatório'
  }),

  nameInstagram: Joi.string()
  .min(1)
  .max(30)
  .optional()
  .messages({
    'string.base': 'Nome do Instagram deve ser uma string',
    'string.min': 'Nome do Instagram deve ter no mínimo 1 caractere',
    'string.max': 'Nome do Instagram deve ter no máximo 30 caracteres'
  }),

  nameFacebook: Joi.string()
  .min(5)
  .max(50)
  .optional()
  .messages({
    'string.base': 'Nome do Facebook deve ser uma string',
    'string.min': 'Nome do Facebook deve ter no mínimo 5 caracteres',
    'string.max': 'Nome do Facebook deve ter no máximo 50 caracteres'
  }),

  email: Joi.string()
  .email()
  .min(6)
  .max(50)
  .optional()
  .messages({
    'string.base': 'Email deve ser uma string',
    'string.email': 'Email deve ser um email válido',
    'string.min': 'Email deve ter no mínimo 6 caracteres',
    'string.max': 'Email deve ter no máximo 50 caracteres'
  })
}).min(3).max(6);

const updateEnterpriseSchema = Joi.object({
  nameEnterprise: Joi.string()
  .min(3)
  .max(50)
  .optional(),

  logoUrl: Joi.string()
  .min(5)
  .max(255)
  .optional(),

  cell: Joi.string()
  .length(11)
  .optional(),

  nameInstagram: Joi.string()
  .min(1)
  .max(30)
  .optional(),

  nameFacebook: Joi.string()
  .min(5)
  .max(50)
  .optional(),

  email: Joi.string()
  .email()
  .min(6)
  .max(50)
  .optional()
}).min(1).max(6);


module.exports = { 
  createEnterpriseSchema,
  updateEnterpriseSchema
};