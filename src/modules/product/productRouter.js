//productRouter.js
const express = require('express');
const productController = require('./productController');

// ROUTER PRIVADO (Admin)
const privateRouter = express.Router();

// CRUD completo para admin
privateRouter.post('/', productController.create);           // Criar
privateRouter.get('/', productController.getAll);            // Listar todas
privateRouter.get('/:id', productController.getById);        // Buscar por ID
privateRouter.put('/:id', productController.update);         // Atualizar
privateRouter.delete('/:id', productController.deleteProduct); // Deletar

module.exports = {
  private: privateRouter
};