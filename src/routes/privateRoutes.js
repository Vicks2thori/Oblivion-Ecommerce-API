//privateRoutes.js  
const express = require('express');
const paymentConditionRoutes = require('../modules/pagamento/payment_condition/payment_conditionRouter');
const paymentRoutes = require("../modules/pagamento/payment/paymentRouter");
const stockCategoryRoutes = require('../modules/estoque/stock_category/stock_categoryRouter');
const categoryRoutes = require('../modules/produto/category/categoryRouter');

const privateRouter = express.Router();

//PAYMENT
//payment condition
privateRouter.use('/payment-conditions', paymentConditionRoutes.private);
privateRouter.use('/payments', paymentRoutes.private)
privateRouter.use('/stock-categories', stockCategoryRoutes.private);
privateRouter.use('/categories', categoryRoutes.private);

module.exports = privateRouter;