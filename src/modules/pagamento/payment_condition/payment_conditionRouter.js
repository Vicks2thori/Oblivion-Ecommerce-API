// payment_conditionRouter.js
const express = require('express');
const payment_conditionController = require('./payment_conditionController');

//ROUTER PÚBLICO (E-commerce)
const publicRouter = express.Router();

//Só rotas que o público pode acessar
publicRouter.get('/active', payment_conditionController.getActive);  // Lista ativas
publicRouter.get('/:id', payment_conditionController.getById);       // Buscar por ID (para pedidos)


// ROUTER PRIVADO (Admin)
const privateRouter = express.Router();

// CRUD completo para admin
privateRouter.post('/', payment_conditionController.create);           // Criar
privateRouter.get('/', payment_conditionController.getAll);            // Listar todas
//privateRouter.get('/active', payment_conditionController.getActive);   // Listar ativas não precisa (isso eu posso fazer uma query)
privateRouter.get('/:id', payment_conditionController.getById);        // Buscar por ID
privateRouter.put('/:id', payment_conditionController.update);         // Atualizar
privateRouter.delete('/:id', payment_conditionController.deletePaymentCondition); // Deletar

module.exports = {
  public: publicRouter,
  private: privateRouter
};