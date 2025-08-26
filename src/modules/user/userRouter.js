//productRouter.js
const express = require('express');
const userController = require('./userController');

//ROUTER PÚBLICO (E-commerce)
const publicRouter = express.Router();

//Só rotas que o público pode acessar
publicRouter.post('/', userController.createClient);
publicRouter.get('/:id', userController.getClientById);
publicRouter.put('/:id', userController.updateClient);
publicRouter.put('/:id/delete', userController.deleteUser);

// ROUTER PRIVADO (Admin)
const privateRouter = express.Router();

// CRUD completo para admin
privateRouter.post('/', userController.createAdmin);           // Criar
privateRouter.get('/', userController.getAllAdmins);            // Listar todas
privateRouter.get('/:id', userController.getAdminById);        // Buscar por ID
privateRouter.put('/:id', userController.updateAdmin);         // Atualizar
privateRouter.put('/:id/delete', userController.deleteUser); // Deletar

module.exports = {
  public: publicRouter,
  private: privateRouter
};