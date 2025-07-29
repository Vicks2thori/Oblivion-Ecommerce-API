// routes/publicRoutes.js
const express = require('express');
const paymentConditionRoutes = require('../modules/payment_condition/payment_conditionRouter');
const paymentRoutes = require("../modules/payment/paymentRouter");
const categoryRoutes = require('../modules/category/categoryRouter');
const productRoutes = require('../modules/product/productRouter');
const siteRoutes = require('../modules/site/siteRouter');
const enterpriseRoutes = require('../modules/enterprise/enterpriseRouter');

const publicRouter = express.Router();

//PAYMENT
//payment condition
publicRouter.use('/payment-conditions', paymentConditionRoutes.public);
publicRouter.use('/payments', paymentRoutes.public);
publicRouter.use('/categories', categoryRoutes.public);
publicRouter.use('/site', siteRoutes.public);
publicRouter.use('/enterprise', enterpriseRoutes.public);

module.exports = publicRouter;