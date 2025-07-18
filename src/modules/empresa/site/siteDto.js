//siteDto.js
const Joi = require('joi');

const createSiteSchema = Joi.object({
  primaryColor: Joi.string().length(6).hex().required(),
  secondColor: Joi.string().length(6).hex().required(),
  textColor: Joi.string().length(6).hex().required()
}).min(3).max(3);

const updateSiteSchema = Joi.object({
  primaryColor: Joi.string().length(6).hex().optional(),
  secondColor: Joi.string().length(6).hex().optional(),
  textColor: Joi.string().length(6).hex().optional()
}).min(1).max(3); // Pelo menos um campo deve ser fornecido

module.exports = { 
  createSiteSchema, 
  updateSiteSchema 
};