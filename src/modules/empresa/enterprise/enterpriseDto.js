//enterpriseDto.js
const Joi = require('joi');

const createEnterpriseSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  logo_image: Joi.string().min(5).max(100).optional(), //chave estrangeira deve ser validada no controler
  phone: Joi.string().length(11).required(),
  instagram: Joi.string().min(1).max(30).optional(),
  facebook: Joi.string().min(5).max(50).optional(),
  email: Joi.string().email().min(6).max(50).optional()
});

const updateEnterpriseSchema = Joi.object({
  name: Joi.string().min(3).max(50).optional(),
  logo_image: Joi.number().min(5).max(100).optional(), //chave estrangeira deve ser validada no controler
  phone: Joi.string().length(11).optional(),
  instagram: Joi.string().min(1).max(30).optional(),
  facebook: Joi.string().min(5).max(50).optional(),
  email: Joi.string().email().min(6).max(50).optional()
});

module.exports = { 
  createEnterpriseSchema, 
  updateEnterpriseSchema };