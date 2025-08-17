//orderDto.js
const Joi = require('joi');

const createOrderSchema = Joi.object({
  //date é gerado automaticamente
  //code é gerado automaticamente
  clientId: Joi.string().length(24).hex().required(), //todos os atributos são inseridos pelo service (client-name, client-phone)
  products: Joi.array().items(
    Joi.object({
      productId: Joi.string().length(24).hex().required(),
      quantity: Joi.number().min(1).required()
      //subtotal será calculado automaticamente
    })
  ).min(1).required(),
  payment: Joi.object({
    methodId: Joi.string().length(24).hex().required(),
    conditionId: Joi.string().length(24).hex().required()
  }).required()
  //total será calculado automaticamente
  //status será 'pending' por padrão
});

const updateOrderSchema = Joi.object({
  status: Joi.string().valid('in_progress','cancel','approved').required()
});

module.exports = { 
  createOrderSchema, 
  updateOrderSchema };