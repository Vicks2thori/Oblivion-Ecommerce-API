//privateRoutes.js  
const express = require('express');
const paymentConditionRoutes = require('../modules/payment_condition/payment_conditionRouter');
const paymentRoutes = require("../modules/payment/paymentRouter");
const stockCategoryRoutes = require('../modules/stock_category/stock_categoryRouter');
const categoryRoutes = require('../modules/category/categoryRouter');
const productRoutes = require('../modules/product/productRouter');
const siteRoutes = require('../modules/site/siteRouter');
const enterpriseRoutes = require('../modules/enterprise/enterpriseRouter');
const orderRoutes = require('../modules/order/orderRouter');
const stockMovementRoutes = require('../modules/stock_movement/stock_movementRouter');
const userRoutes = require('../modules/user/userRouter');

const privateRouter = express.Router();

//PAYMENT
//payment condition
privateRouter.use('/payment-conditions', paymentConditionRoutes.private);
privateRouter.use('/payments', paymentRoutes.private)
privateRouter.use('/stock-categories', stockCategoryRoutes.private);
privateRouter.use('/categories', categoryRoutes.private);
privateRouter.use('/products', productRoutes.private);
privateRouter.use('/site', siteRoutes.private);
privateRouter.use('/enterprise', enterpriseRoutes.private);
privateRouter.use('/orders', orderRoutes.private);
privateRouter.use('/stock-movements', stockMovementRoutes.private);
privateRouter.use('/admins', userRoutes.private);

module.exports = privateRouter;