// orderRouter.js
const express = require('express');
const orderController = require('./orderController');

//ROUTER PÚBLICO (E-commerce)
const publicRouter = express.Router();

//Só rotas que o público pode acessar
publicRouter.post('/', orderController.create);           // Criar
publicRouter.get('/:id', orderController.getOrdersByClient);       // Buscar por ID do client

// ROUTER PRIVADO (Admin)
const privateRouter = express.Router();

// CRUD
privateRouter.get('/', orderController.getOrdersByStatus);            // Listar todas
privateRouter.put('/:id', orderController.update);         // Atualizar

module.exports = {
  public: publicRouter,
  private: privateRouter
};