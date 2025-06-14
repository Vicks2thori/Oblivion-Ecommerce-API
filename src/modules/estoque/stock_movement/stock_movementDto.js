//movimentStockDto.js
const Joi = require('joi');

const createMovimentStockSchema = Joi.object({
  nameStockMoviment: Joi.string().min(3).max(50).required(),
  dateStockMoviment: Joi.date().required(), //validar como formatar e mandar pro bd
  //idStockCategory
  typeStockMoviment: Joi.string().valid('exit', 'entry', 'definition').required(),
  //idAdmins se for mapear (pensar em outros tambem)
  //idProduct ainda vou fazer uma tabela intermediária pra eu poder colocar
});

module.exports = { createMovimentStockSchema };