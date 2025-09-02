//categoryRouter.js
const express = require('express');
const categoryController = require('./categoryController');


//CLIENT
const publicRouter = express.Router();
//Read -get
publicRouter.get('/active', categoryController.getActive);


//ADMIN
const privateRouter = express.Router();

//Create -post
privateRouter.post('/', categoryController.create);

//Read -get
privateRouter.get('/', categoryController.getAll);
privateRouter.get('/:id', categoryController.getById);

//Update/Delete -put
privateRouter.put('/:id', categoryController.update);
privateRouter.put('/:id/delete', categoryController.deleteCategory);


module.exports = {
  public: publicRouter,
  private: privateRouter
};