//enterpriseRouter.js
const express = require('express');
const enterpriseController = require('./enterpriseController');

//CLIENT
const publicRouter = express.Router();

//Read -get
publicRouter.get('/', enterpriseController.getEnterprise);


//ADMIN
const privateRouter = express.Router();

//Read -get
privateRouter.get('/', enterpriseController.getEnterprise);

//Update -put
privateRouter.put('/', enterpriseController.updateEnterprise);


module.exports = {
  public: publicRouter,
  private: privateRouter
};