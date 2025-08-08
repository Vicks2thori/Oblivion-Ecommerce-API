// siteRouter.js
const express = require('express');
const siteController = require('./siteController');

//ROUTER PÚBLICO (E-commerce)
const publicRouter = express.Router();

//Só rotas que o público pode acessar
publicRouter.get('/', siteController.getSite);  // Lista


// ROUTER PRIVADO (Admin)
const privateRouter = express.Router();

// CRUD completo para admin
privateRouter.get('/', siteController.getSite);  // Lista
privateRouter.put('/', siteController.updateSite);         // Atualizar

module.exports = {
  public: publicRouter,
  private: privateRouter
};