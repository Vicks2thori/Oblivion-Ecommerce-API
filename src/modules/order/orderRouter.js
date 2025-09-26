//orderRouter.js
const express = require('express');
const orderController = require('./orderController');

//CLIENT
const publicRouter = express.Router();

//Create -post
publicRouter.post('/', orderController.create);

//Get -get
publicRouter.get('/client/:clientId', orderController.getByClient);
publicRouter.get('/:id', orderController.getById);


//ADMIN
const privateRouter = express.Router();

//Read -get
privateRouter.get('/status/:status', orderController.getByStatus);
privateRouter.get('/:id', orderController.getById);

//Update -put
privateRouter.put('/:id', orderController.update);


module.exports = {
  public: publicRouter,
  private: privateRouter
};