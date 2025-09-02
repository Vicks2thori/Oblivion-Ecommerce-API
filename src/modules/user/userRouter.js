//productRouter.js
const express = require('express');
const userController = require('./userController');


//CLIENT
const publicRouter = express.Router();

//Create -post
publicRouter.post('/', userController.createClient);

//Read -get
publicRouter.get('/:id', userController.getClientById);

//Update/Delete -put
publicRouter.put('/:id', userController.updateClient);
publicRouter.put('/:id/delete', userController.deleteUser);


//ADMIN
const privateRouter = express.Router();

//Create -post
privateRouter.post('/', userController.createAdmin);           // Criar

//Read -get
privateRouter.get('/', userController.getAllAdmins);
privateRouter.get('/:id', userController.getAdminById);

//Update/Delete -put
privateRouter.put('/:id', userController.updateAdmin);
privateRouter.put('/:id/delete', userController.deleteUser); // Deletar


module.exports = {
  public: publicRouter,
  private: privateRouter
};