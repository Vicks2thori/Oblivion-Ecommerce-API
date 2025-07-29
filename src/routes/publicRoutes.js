// routes/publicRoutes.js
const express = require('express');
<<<<<<< Updated upstream
const paymentConditionRoutes = require('../modules/pagamento/payment_condition/payment_conditionRouter');
const paymentRoutes = require("../modules/pagamento/payment/paymentRouter");
const categoryRoutes = require('../modules/produto/category/categoryRouter');
const siteRoutes = require('../modules/empresa/site/siteRouter');
const enterpriseRoutes = require('../modules/empresa/enterprise/enterpriseRouter');
=======
const paymentConditionRoutes = require('../modules/payment_condition/payment_conditionRouter');
const paymentRoutes = require("../modules/payment/paymentRouter");
const categoryRoutes = require('../modules/category/categoryRouter');
const productRoutes = require('../modules/product/productRouter');
const siteRoutes = require('../modules/site/siteRouter');
const enterpriseRoutes = require('../modules/enterprise/enterpriseRouter');
>>>>>>> Stashed changes

const publicRouter = express.Router();

//PAYMENT
//payment condition
publicRouter.use('/payment-conditions', paymentConditionRoutes.public);
publicRouter.use('/payments', paymentRoutes.public);
publicRouter.use('/categories', categoryRoutes.public);
publicRouter.use('/site', siteRoutes.public);
publicRouter.use('/enterprise', enterpriseRoutes.public);

module.exports = publicRouter;