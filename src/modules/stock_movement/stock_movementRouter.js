//stock_movementRouter.js
const express = require('express');
const stock_movementController = require('./stock_movementController');

//ADMIN
const privateRouter = express.Router();

//Create -post
privateRouter.post('/', stock_movementController.create);

//Read -get
privateRouter.get('/', stock_movementController.getAll);
privateRouter.get('/:id', stock_movementController.getById);

module.exports = { private: privateRouter };