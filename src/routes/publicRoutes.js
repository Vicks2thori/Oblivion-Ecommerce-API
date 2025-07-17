// routes/publicRoutes.js
const express = require('express');
const paymentConditionRoutes = require('../modules/pagamento/payment_condition/payment_conditionRouter');
const paymentRoutes = require("../modules/pagamento/payment/paymentRouter");
const categoryRoutes = require('../modules/produto/category/categoryRouter');

const publicRouter = express.Router();

//PAYMENT
//payment condition
publicRouter.use('/payment-conditions', paymentConditionRoutes.public);
publicRouter.use('/payments', paymentRoutes.public);
publicRouter.use('/categories', categoryRoutes.public);

module.exports = publicRouter;