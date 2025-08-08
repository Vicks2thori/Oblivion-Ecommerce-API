//enterpriseRouter.js
const express = require('express');
const enterpriseController = require('./enterpriseController');

//ROUTER PÚBLICO (E-commerce)
const publicRouter = express.Router();

//Só rotas que o público pode acessar
publicRouter.get('/', enterpriseController.getEnterprise);  // Lista


// ROUTER PRIVADO (Admin)
const privateRouter = express.Router();

// CRUD completo para admin
privateRouter.get('/', enterpriseController.getEnterprise);  // Lista
privateRouter.put('/', enterpriseController.updateEnterprise);         // Atualizar

module.exports = {
  public: publicRouter,
  private: privateRouter
};