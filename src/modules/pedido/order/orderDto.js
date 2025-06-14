//orderDto.js
//tenho que ver o schema ainda pois tenho 2 tabelas
const Joi = require('joi');

const createOrderSchema = Joi.object({
  date: Joi.date().iso().required(),
  code: Joi.string().length(5).required(), //vou ver na hora de fazer os controllers de gerar um codigo de 5 numeros unico
  client_id: Joi.number().min(1).max(255).required(),
  payment_id: Joi.number().min(1).max(255).required(),
  payment_condition_id: Joi.number().min(1).max(255).required(),
  total: Joi.number().precision(2).min(0.01).max(99999999.99).required(),
  status: Joi.string().valid('pending','cancel','approved').default('pending').required() //depois eu vejo se vai ter o "em conversa"
});

module.exports = { createOrderSchema };