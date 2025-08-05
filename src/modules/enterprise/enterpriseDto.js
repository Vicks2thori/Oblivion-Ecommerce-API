//enterpriseDto.js
const Joi = require('joi');

const createEnterpriseSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  logoUrl: Joi.string().min(5).max(255).required(), //vai ser obrigatório?
  phone: Joi.string().length(11).required(),
  instagram: Joi.string().min(1).max(30).optional(),
  facebook: Joi.string().min(5).max(50).optional(),
  email: Joi.string().email().min(6).max(50).optional()
}).min(3).max(6);

const updateEnterpriseSchema = Joi.object({
  name: Joi.string().min(3).max(50).optional(),
  logoUrl: Joi.string().min(5).max(255).optional(),
  phone: Joi.string().length(11).optional(),
  instagram: Joi.string().min(1).max(30).optional(),
  facebook: Joi.string().min(5).max(50).optional(),
  email: Joi.string().email().min(6).max(50).optional()
}).min(1).max(6);

module.exports = { 
  createEnterpriseSchema, 
  updateEnterpriseSchema };