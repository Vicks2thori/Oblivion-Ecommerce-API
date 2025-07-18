// paymentRouter.js
const express = require('express');
const paymentController = require('./paymentController');

//ROUTER PÚBLICO (E-commerce)
const publicRouter = express.Router();

//Só rotas que o público pode acessar
publicRouter.get('/active', paymentController.getActive);  // Lista ativas
publicRouter.get('/:id', paymentController.getById); //lista por id? preciso ver como vai ser feito


// ROUTER PRIVADO (Admin)
const privateRouter = express.Router();

// CRUD completo para admin
privateRouter.post('/', paymentController.create);           // Criar
privateRouter.get('/', paymentController.getAll);            // Listar todas
privateRouter.get('/:id', paymentController.getById);        // Buscar por ID
privateRouter.put('/:id', paymentController.update);         // Atualizar
privateRouter.delete('/:id', paymentController.deletePayment); // Deletar

module.exports = {
  public: publicRouter,
  private: privateRouter
};