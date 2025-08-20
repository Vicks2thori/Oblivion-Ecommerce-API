//stock_movementRouter.js
const express = require('express');
const stock_movementController = require('./stock_movementController');

// ROUTER PRIVADO (Admin)
const privateRouter = express.Router();

// CRUD completo para admin
privateRouter.post('/', stock_movementController.create);           // Criar
privateRouter.get('/', stock_movementController.getAll);            // Listar todas
privateRouter.get('/:id', stock_movementController.getById);        // Buscar por ID

module.exports = {
  private: privateRouter
};