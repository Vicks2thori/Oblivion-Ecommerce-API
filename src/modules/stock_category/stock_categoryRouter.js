//stock_categoryRouter.js
const express = require('express');
const stock_categoryController = require('./stock_categoryController');

//ADMIN
const privateRouter = express.Router();

//Create -post
privateRouter.post('/', stock_categoryController.create);

//Read -get
privateRouter.get('/', stock_categoryController.getAll);
privateRouter.get('/active', stock_categoryController.getActive);
privateRouter.get('/:id', stock_categoryController.getById);

//Update/Delete -put
privateRouter.put('/:id', stock_categoryController.update);
privateRouter.delete(':id/delete', stock_categoryController.deleteStockCategory);


module.exports = {
  private: privateRouter
};