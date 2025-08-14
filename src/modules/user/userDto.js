//userDto.js
const Joi = require('joi');

const createAdminSchema = Joi.object({ //criei um para cada ja que se cria e se atualiza separadamente
  name: Joi.string().min(5).max(80).required(),
  email: Joi.string().email().min(6).max(50).required(),
  password: Joi.string().min(8).max(255).required(), //valida senha em texto plano, não criptografada
  type: Joi.string().valid('admin').required(),
  adminDetails: Joi.object({
    status: Joi.boolean().default(true)
  }).required()
}).min(6).max(6);

const createClientSchema = Joi.object({
  name: Joi.string().min(5).max(80).required(),
  email: Joi.string().email().min(6).max(50).required(),
  password: Joi.string().min(8).max(255).required(),
  type: Joi.string().valid('client').required(),
  clientDetails: Joi.object({
    cpf: Joi.string().length(11).required(),
    cell: Joi.string().length(11).required()
  }).required()
}).min(5).max(5); //clientDetails conta como 1 objeto

const updateAdminSchema = Joi.object({
  name: Joi.string().min(5).max(80).optional(),
  email: Joi.string().email().min(6).max(50).optional(),
  password: Joi.string().min(8).max(255).optional(),
  type: Joi.string().valid('admin').required(), //para validar se pode alterar
  adminDetails: Joi.object({
    status: Joi.boolean().default(true)
  }).optional()
}).min(2).max(5); //minimo 2 pois precisa do tipo + 1 alteração

const updateClientSchema = Joi.object({
  name: Joi.string().min(5).max(80).optional(),
  email: Joi.string().email().min(6).max(50).optional(),
  password: Joi.string().min(8).max(255).optional(),
  type: Joi.string().valid('client').required(), //para validar se pode alterar
  clientDetails: Joi.object({
    cpf: Joi.string().length(11).optional(),
    cell: Joi.string().length(11).optional()
  }).optional()
}).min(2).max(5);

module.exports = { 
  createAdminSchema,
  createClientSchema,
  updateClientSchema,
  updateAdminSchema
};
