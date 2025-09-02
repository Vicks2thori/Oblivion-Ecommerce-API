//productRouter.js
const express = require('express');
const productController = require('./productController');


//ADMIN
const privateRouter = express.Router();

//Create -post
privateRouter.post('/', productController.create);

//Read -get
privateRouter.get('/:id', productController.getById);

//Update/Delete -put
privateRouter.put('/:id', productController.update);
privateRouter.put('/:id/delete', productController.deleteProduct);

module.exports = { private: privateRouter };