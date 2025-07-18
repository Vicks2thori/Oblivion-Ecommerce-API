// routes/publicRoutes.js
const express = require('express');
const paymentConditionRoutes = require('../modules/pagamento/payment_condition/payment_conditionRouter');
const paymentRoutes = require("../modules/pagamento/payment/paymentRouter");
const categoryRoutes = require('../modules/produto/category/categoryRouter');
const productRoutes = require('../modules/produto/product/productRouter');
const siteRoutes = require('../modules/empresa/site/siteRouter');

const publicRouter = express.Router();

//PAYMENT
//payment condition
publicRouter.use('/payment-conditions', paymentConditionRoutes.public);
publicRouter.use('/payments', paymentRoutes.public);
publicRouter.use('/categories', categoryRoutes.public);
publicRouter.use('/products', productRoutes.public);
publicRouter.use('/site', siteRoutes.public);

module.exports = publicRouter;