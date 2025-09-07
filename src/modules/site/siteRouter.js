// siteRouter.js
const express = require('express');
const siteController = require('./siteController');


//CLIENT
const publicRouter = express.Router();

//Read -get
publicRouter.get('/', siteController.getSite);


//ADMIN
const privateRouter = express.Router();

//Read -get
privateRouter.get('/', siteController.getSite);

//Update -put
privateRouter.put('/', siteController.updateSite);


module.exports = {
  public: publicRouter,
  private: privateRouter
};