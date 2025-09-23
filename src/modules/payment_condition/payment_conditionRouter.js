// payment_conditionRouter.js
const express = require('express');
const payment_conditionController = require('./payment_conditionController');


//ADMIN
const privateRouter = express.Router();

//Create -post
privateRouter.post('/', payment_conditionController.create);

//Read -get
privateRouter.get('/', payment_conditionController.getAll);
privateRouter.get('/:id', payment_conditionController.getById);

//Update/Delete -put
privateRouter.put('/:id', payment_conditionController.update);
privateRouter.put('/:id/delete', payment_conditionController.deletePaymentCondition);

module.exports = {
  private: privateRouter
};