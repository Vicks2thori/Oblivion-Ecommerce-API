//productDto.js
const Joi = require('joi');

const createProductSchema = Joi.object({
  name: Joi.string().min(1).max(100).required(),
  imageUrl: Joi.string().min(1).max(255).required(), //Imagem vai ser obrigatória? se sim devo restringir, se não eu preciso ver como ficaria o front
  description: Joi.string().max(65535).optional(),
  price: Joi.number().precision(2).min(0.01).max(999999.99).required(),
  code: Joi.number().min(1).max(9223372036854775807).required(),
  categoryId: Joi.string().length(24).hex().required(),
  quantity: Joi.number().min(1).max(65535).required(),
  status: Joi.boolean().default(true).required() //se o status é obrigatório mas o default é true como o front manda? e sim da conflito
}).min(7).max(8);

const updateProductSchema = Joi.object({
  name: Joi.string().min(1).max(100).optional(),
  imageUrl: Joi.string().min(1).max(255).optional(),
  description: Joi.string().max(65535).optional(),
  price: Joi.number().precision(2).min(0.01).max(999999.99).optional(),
  code: Joi.number().min(1).max(9223372036854775807).optional(),
  categoryId: Joi.string().length(24).hex().optional(),
  quantity: Joi.number().min(1).max(65535).optional(),
  status: Joi.boolean().optional(),  //se no Dto e o Entity é obrigatório mas o default é true como faz?
  deleted: Joi.boolean().optional()
}).min(1).max(9); //mesma duvida a cerca da quantidade de requisições (no caso de deleted como que o front manda? vai mandar SÓ ele ou o resto?)
module.exports = { 
  createProductSchema, 
  updateProductSchema };