//siteDto.js
const Joi = require('joi');

const createSiteSchema = Joi.object({
  primaryColorSite: Joi.string().min(6).max(6).required(),
  secondColorSite: Joi.string().min(6).max(6).required(),
  textColorSite: Joi.string().min(6).max(6).required(),
});

module.exports = { createSiteSchema };