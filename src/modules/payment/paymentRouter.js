//paymentRouter.js
const express = require('express');
const paymentController = require('./paymentController');


//CLIENT
const publicRouter = express.Router();

//Read -get
publicRouter.get('/active', paymentController.getActive);


//ADMIN
const privateRouter = express.Router();

//Create -post
privateRouter.post('/', paymentController.create);

//Read -get
privateRouter.get('/', paymentController.getAll);
privateRouter.get('/:id', paymentController.getById);

//Update/Delete -put
privateRouter.put('/:id', paymentController.update);
privateRouter.put('/:id/delete', paymentController.deletePayment);


module.exports = {
  public: publicRouter,
  private: privateRouter
};