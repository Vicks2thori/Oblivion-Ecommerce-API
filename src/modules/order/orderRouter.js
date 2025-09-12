//orderRouter.js
const express = require('express');
const orderController = require('./orderController');

//CLIENT
const publicRouter = express.Router();

//Create -post
publicRouter.post('/', orderController.create);

//Get -get
publicRouter.get('/:id', orderController.getOrdersByClient);


//ADMIN
const privateRouter = express.Router();

//Read -get
privateRouter.get('/:status', orderController.getOrdersByStatus);

//Update -put
privateRouter.put('/:id', orderController.update);

module.exports = {
  public: publicRouter,
  private: privateRouter
};