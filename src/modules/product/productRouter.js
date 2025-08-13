//productRouter.js
const express = require('express');
const productController = require('./productController');

//ROUTER PÚBLICO (E-commerce)
const publicRouter = express.Router();

//Só rotas que o público pode acessar
publicRouter.get('/active', productController.getActive);  // Novamente a duvida se faz sentido criar uma rota
//No caso se ele fosse acessado dentro da categoria posso fazer por lá


// ROUTER PRIVADO (Admin)
const privateRouter = express.Router();

// CRUD completo para admin
privateRouter.post('/', productController.create);           // Criar
privateRouter.get('/', productController.getAll);            // Listar todas
privateRouter.get('/:id', productController.getById);        // Buscar por ID
privateRouter.put('/:id', productController.update);         // Atualizar
privateRouter.delete('/:id', productController.deleteProduct); // Deletar

module.exports = {
  public: publicRouter,
  private: privateRouter
};