// healthRoutes.js - Rotas de healthcheck para cada módulo
const express = require('express');
const { createHealthCheck, generalHealthCheck, detailedHealthCheck } = require('../middlewares/healthCheckMiddleware');

const healthRouter = express.Router();

// Healthcheck geral da API
healthRouter.get('/', generalHealthCheck);

// Healthcheck detalhado
healthRouter.get('/detailed', detailedHealthCheck);

// Healthcheck específico para produtos
healthRouter.get('/products', createHealthCheck('Products', async () => {
    try {
        // Verificar se o módulo de produtos está funcionando
        const Product = require('../modules/product/productService');
        const productCount = await Product.getProductCount();
        return productCount >= 0; // Se não der erro, está funcionando
    } catch (error) {
        return false;
    }
}));

// Healthcheck específico para categorias
healthRouter.get('/categories', createHealthCheck('Categories', async () => {
    try {
        const Category = require('../modules/category/categoryService');
        const categoryCount = await Category.getCategoryCount();
        return categoryCount >= 0;
    } catch (error) {
        return false;
    }
}));

// Healthcheck específico para pedidos
healthRouter.get('/orders', createHealthCheck('Orders', async () => {
    try {
        const Order = require('../modules/order/orderService');
        const orderCount = await Order.getOrderCount();
        return orderCount >= 0;
    } catch (error) {
        return false;
    }
}));

// Healthcheck específico para usuários
healthRouter.get('/users', createHealthCheck('Users', async () => {
    try {
        const User = require('../modules/user/userService');
        const userCount = await User.getUserCount();
        return userCount >= 0;
    } catch (error) {
        return false;
    }
}));

// Healthcheck específico para pagamentos
healthRouter.get('/payments', createHealthCheck('Payments', async () => {
    try {
        const Payment = require('../modules/payment/paymentService');
        const paymentCount = await Payment.getPaymentCount();
        return paymentCount >= 0;
    } catch (error) {
        return false;
    }
}));

// Healthcheck específico para estoque
healthRouter.get('/stock', createHealthCheck('Stock', async () => {
    try {
        const StockCategory = require('../modules/stock_category/stock_categoryService');
        const stockCategoryCount = await StockCategory.getStockCategoryCount();
        return stockCategoryCount >= 0;
    } catch (error) {
        return false;
    }
}));

// Healthcheck específico para site/empresa
healthRouter.get('/site', createHealthCheck('Site', async () => {
    try {
        const Site = require('../modules/site/siteService');
        const siteConfig = await Site.getSiteConfig();
        return !!siteConfig;
    } catch (error) {
        return false;
    }
}));

// Healthcheck para todas as rotas públicas
healthRouter.get('/public-routes', createHealthCheck('Public Routes', async () => {
    try {
        // Verificar se as rotas públicas estão respondendo
        const publicRoutes = require('./publicRoutes');
        return !!publicRoutes;
    } catch (error) {
        return false;
    }
}));

// Healthcheck para todas as rotas privadas
healthRouter.get('/private-routes', createHealthCheck('Private Routes', async () => {
    try {
        // Verificar se as rotas privadas estão respondendo
        const privateRoutes = require('./privateRoutes');
        return !!privateRoutes;
    } catch (error) {
        return false;
    }
}));

// Healthcheck para banco de dados
healthRouter.get('/database', createHealthCheck('Database', async () => {
    try {
        const mongoose = require('mongoose');
        return mongoose.connection.readyState === 1;
    } catch (error) {
        return false;
    }
}));

// Healthcheck para sistema operacional
healthRouter.get('/system', createHealthCheck('System', async () => {
    try {
        const os = require('os');
        const totalMemory = os.totalmem();
        const freeMemory = os.freemem();
        const memoryUsage = ((totalMemory - freeMemory) / totalMemory) * 100;
        
        // Considerar saudável se uso de memória < 90%
        return memoryUsage < 90;
    } catch (error) {
        return false;
    }
}));

module.exports = healthRouter;
