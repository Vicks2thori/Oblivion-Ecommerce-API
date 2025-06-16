//siteDto.js
const Joi = require('joi');

const createSiteSchema = Joi.object({
  primary_color: Joi.string().length(6).required().default('000000'), //ainda vamos pensar no esquema de cores
  second_color: Joi.string().length(6).required().default('123456'),
  text_color: Joi.string().length(6).required().default('FFFFFF'),
});

const updateSiteSchema = Joi.object({
  primary_color: Joi.string().length(6).optional(),
  second_color: Joi.string().length(6).optional(),
  text_color: Joi.string().length(6).optional(),
});

module.exports = { createSiteSchema, updateSiteSchema };