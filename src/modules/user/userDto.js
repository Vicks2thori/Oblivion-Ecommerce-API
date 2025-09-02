//userDto.js
const Joi = require('joi');

const createAdminSchema = Joi.object({
  name: Joi.string()
  .min(5)
  .max(80)
  .required()
  .messages({
    'string.min': 'Nome deve ter no mínimo 5 caracteres',
    'string.max': 'Nome deve ter no máximo 80 caracteres',
    'string.empty': 'Nome é obrigatório',
    'any.required': 'Nome é obrigatório'
  }),

  email: Joi.string()
  .email()
  .min(6)
  .max(50)
  .required()
  .messages({
    'string.email': 'Email deve ser um email válido',
    'string.min': 'Email deve ter no mínimo 6 caracteres',
    'string.max': 'Email deve ter no máximo 50 caracteres',
    'string.empty': 'Email é obrigatório',
    'any.required': 'Email é obrigatório'
  }),
  
  password: Joi.string()
  .min(8)
  .max(255)
  .required()
  .messages({
    'string.min': 'Senha deve ter no mínimo 8 caracteres',
    'string.max': 'Senha deve ter no máximo 255 caracteres',
    'string.empty': 'Senha é obrigatória',
    'any.required': 'Senha é obrigatória'
  }),

  type: Joi.string()
  .valid('admin')
  .required()
  .messages({
    'string.empty': 'Tipo é obrigatório',
    'any.required': 'Tipo é obrigatório',
    'string.valid': 'Tipo deve ser admin'
  }),

  adminDetails: Joi.object({
    status: Joi.boolean()
    .default(true)
    .messages({
      'boolean.base': 'Status deve ser um booleano',
    }),
  }).optional(),

  clientDetails: Joi.forbidden()
}).min(4).max(5);

const createClientSchema = Joi.object({
  name: Joi.string()
  .min(5)
  .max(80)
  .required()
  .messages({
    'string.min': 'Nome deve ter no mínimo 5 caracteres',
    'string.max': 'Nome deve ter no máximo 80 caracteres',
    'string.empty': 'Nome é obrigatório',
    'any.required': 'Nome é obrigatório'
  }),

  email: Joi.string()
  .email()
  .min(6)
  .max(50)
  .required()
  .messages({
    'string.email': 'Email deve ser um email válido',
    'string.min': 'Email deve ter no mínimo 6 caracteres',
    'string.max': 'Email deve ter no máximo 50 caracteres',
    'string.empty': 'Email é obrigatório',
    'any.required': 'Email é obrigatório'
  }),

  password: Joi.string()
  .min(8)
  .max(255)
  .required()
  .messages({
    'string.min': 'Senha deve ter no mínimo 8 caracteres',
    'string.max': 'Senha deve ter no máximo 255 caracteres',
    'string.empty': 'Senha é obrigatória',
    'any.required': 'Senha é obrigatória'
  }),

  type: Joi.string()
  .valid('client')
  .required()
  .messages({
    'string.empty': 'Tipo é obrigatório',
    'any.required': 'Tipo é obrigatório',
    'string.valid': 'Tipo deve ser client'
  }),

  clientDetails: Joi.object({
    cpf: Joi.string()
    .length(11)
    .required()
    .messages({
      'string.length': 'CPF deve ter exatamente 11 caracteres',
      'any.required': 'CPF é obrigatório',
      'string.empty': 'CPF é obrigatório'
    }),
    
    cell: Joi.string()
    .length(11)
    .required()
    .messages({
      'string.length': 'Telefone deve ter exatamente 11 caracteres',
      'any.required': 'Telefone é obrigatório',
      'string.empty': 'Telefone é obrigatório'
    }),
  }).required()
  .messages({
    'object.empty': 'ClientDetails é obrigatório',
    'any.required': 'ClientDetails é obrigatório'
  }),

  adminDetails: Joi.forbidden()
}).min(5).max(5);

const updateAdminSchema = Joi.object({  
  name: Joi.string()
  .min(5)
  .max(80)
  .optional()
  .messages({
    'string.min': 'Nome deve ter no mínimo 5 caracteres',
    'string.max': 'Nome deve ter no máximo 80 caracteres'
  }),

  email: Joi.string()
  .email()
  .min(6)
  .max(50)
  .optional()
  .messages({
    'string.email': 'Email deve ser um email válido',
    'string.min': 'Email deve ter no mínimo 6 caracteres',
    'string.max': 'Email deve ter no máximo 50 caracteres'
  }),

  password: Joi.string()
  .min(8)
  .max(255)
  .optional()
  .messages({
    'string.min': 'Senha deve ter no mínimo 8 caracteres',
    'string.max': 'Senha deve ter no máximo 255 caracteres'
  }),

  type: Joi.string()
  .valid('admin')
  .required()
  .messages({
    'string.empty': 'Tipo é obrigatório',
    'any.required': 'Tipo é obrigatório',
    'string.valid': 'Tipo deve ser admin'
  }),

  adminDetails: Joi.object({
    status: Joi.boolean()
    .default(true)
    .messages({
      'boolean.base': 'Status deve ser um booleano',
    }),
  }).optional(),

  clientDetails: Joi.forbidden()
}).min(2).max(5);

const updateClientSchema = Joi.object({
  name: Joi.string()
  .min(5)
  .max(80)
  .optional()
  .messages({
    'string.min': 'Nome deve ter no mínimo 5 caracteres',
    'string.max': 'Nome deve ter no máximo 80 caracteres'
  }),

  email: Joi.string()
  .email()
  .min(6)
  .max(50)
  .optional()
  .messages({
    'string.email': 'Email deve ser um email válido',
    'string.min': 'Email deve ter no mínimo 6 caracteres',
    'string.max': 'Email deve ter no máximo 50 caracteres'
  }),

  password: Joi.string()
  .min(8)
  .max(255)
  .optional()
  .messages({
    'string.min': 'Senha deve ter no mínimo 8 caracteres',
    'string.max': 'Senha deve ter no máximo 255 caracteres'
  }),

  type: Joi.string()
  .valid('client')
  .required()
  .messages({
    'string.empty': 'Tipo é obrigatório',
    'any.required': 'Tipo é obrigatório',
    'string.valid': 'Tipo deve ser client'
  }),

  clientDetails: Joi.object({
    cpf: Joi.string()
    .length(11)
    .optional()
    .messages({
      'string.length': 'CPF deve ter exatamente 11 caracteres',
    }),
    cell: Joi.string()
    .length(11)
    .optional()
    .messages({
      'string.length': 'Telefone deve ter exatamente 11 caracteres',
    }),
  }).optional(),

  adminDetails: Joi.forbidden()
}).min(2).max(5);

module.exports = { 
  createAdminSchema,
  createClientSchema,
  updateClientSchema,
  updateAdminSchema
};
