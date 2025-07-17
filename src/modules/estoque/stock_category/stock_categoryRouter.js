//stock_categoryRouter.js
const express = require('express');
const stock_categoryController = require('./stock_categoryController');

// ROUTER PRIVADO (Admin)
const privateRouter = express.Router();

// CRUD completo para admin
privateRouter.post('/', stock_categoryController.create);           // Criar
privateRouter.get('/', stock_categoryController.getAll);            // Listar todas
//privateRouter.get('/active', stock_categoryController.getActive);   // Listar ativas preciso valida, isso vai ser uma query? e se não for eu preciso saber como vou relacionar
privateRouter.get('/:id', stock_categoryController.getById);        // Buscar por ID
privateRouter.put('/:id', stock_categoryController.update);         // Atualizar
privateRouter.delete('/:id', stock_categoryController.deleteStockCategory); // Deletar

module.exports = {
  private: privateRouter
};