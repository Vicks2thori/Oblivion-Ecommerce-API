//paymentDto.js
const Joi = require('joi');

const createPaymentSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  imageType: Joi.string().valid('Pix', 'Others', 'Money', 'Card', 'Voucher').required(),
  paymentConditions: Joi.array().items(
    Joi.object({
      conditionsId: Joi.string().length(24).hex().required() //um id no mango é uma string de 24 digitos hexadecimal
    })
  ).min(1).required(),
  status: Joi.boolean().default(true).required()
}).min(4).max(4); //ainda estou avaliando sobre a quantidade minima (condition vai ser obrigatório?)
//máximo tambem, ja que vai ter várias condições

const updatePaymentSchema = Joi.object({
  name: Joi.string().min(3).max(50).optional(),
  imageType: Joi.string().valid('Pix', 'Others', 'Money', 'Card', 'Voucher').optional(),
  paymentConditions: Joi.array().items( //para a validação de muitas condições de pagamento
    Joi.object({
      conditionsId: Joi.string().length(24).hex().required(),
      action: Joi.string().valid('add', 'remove').required() // Ação para adicionar ou remover
    })
  ).optional(),
  status: Joi.boolean().optional(),
  deleted: Joi.boolean().optional()
}).min(1).max(5);

module.exports = { 
  createPaymentSchema, 
  updatePaymentSchema };