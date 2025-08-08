// categoryRouter.js
const express = require('express');
const categoryController = require('./categoryController');

//ROUTER PÚBLICO (E-commerce)
const publicRouter = express.Router();

//Só rotas que o público pode acessar
publicRouter.get('/active', categoryController.getActive);  // Lista ativas


// ROUTER PRIVADO (Admin)
const privateRouter = express.Router();

// CRUD completo para admin
privateRouter.post('/', categoryController.create);           // Criar
privateRouter.get('/', categoryController.getAll);            // Listar todas
privateRouter.put('/:id', categoryController.update);         // Atualizar
privateRouter.delete('/:id', categoryController.deleteCategory); // Deletar

module.exports = {
  public: publicRouter,
  private: privateRouter
};