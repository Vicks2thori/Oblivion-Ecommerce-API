//privateRoutes.js  
const express = require('express');
const paymentConditionRoutes = require('../modules/pagamento/payment_condition/payment_conditionRouter');

const privateRouter = express.Router();

//PAYMENT
//payment condition
privateRouter.use('/payment-conditions', paymentConditionRoutes.private);

module.exports = privateRouter;