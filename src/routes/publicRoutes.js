// routes/publicRoutes.js
const express = require('express');
const paymentConditionRoutes = require('../modules/payment_condition/payment_conditionRouter');
const paymentRoutes = require("../modules/payment/paymentRouter");
const categoryRoutes = require('../modules/category/categoryRouter');
const siteRoutes = require('../modules/site/siteRouter');
const enterpriseRoutes = require('../modules/enterprise/enterpriseRouter');
const orderRoutes = require('../modules/order/orderRouter');
const userRoutes = require('../modules/user/userRouter');
const auth = require('../middlewares/auth');
const { isClient } = require('../middlewares/role');

const publicRouter = express.Router();

publicRouter.use('/payments', paymentRoutes.public);
publicRouter.use('/categories', categoryRoutes.public);
publicRouter.use('/site', siteRoutes.public);
publicRouter.use('/enterprise', enterpriseRoutes.public);
publicRouter.use('/orders', orderRoutes.public);
publicRouter.use('/clients', userRoutes.public);

module.exports = publicRouter;