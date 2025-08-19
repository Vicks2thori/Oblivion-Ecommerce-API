// healthCheckMiddleware.js - Middleware para verificar saúde das rotas
const { connectDB } = require('../model/database');

/**
 * Middleware para verificar saúde de rotas específicas
 * @param {string} routeName - Nome da rota para identificar no log
 * @param {Function} customCheck - Função personalizada de verificação
 * @returns {Function} Middleware do Express
 */
function createHealthCheck(routeName, customCheck = null) {
    return async (req, res, next) => {
        const startTime = Date.now();
        const healthData = {
            route: routeName,
            timestamp: new Date().toISOString(),
            status: 'healthy',
            responseTime: 0,
            checks: {
                database: 'unknown',
                custom: 'unknown'
            }
        };

        try {
            // Verificar conexão com banco de dados
            try {
                const dbStatus = await checkDatabaseConnection();
                healthData.checks.database = dbStatus ? 'healthy' : 'unhealthy';
            } catch (error) {
                healthData.checks.database = 'error';
                healthData.status = 'degraded';
            }

            // Verificação customizada se fornecida
            if (customCheck && typeof customCheck === 'function') {
                try {
                    const customStatus = await customCheck();
                    healthData.checks.custom = customStatus ? 'healthy' : 'unhealthy';
                } catch (error) {
                    healthData.checks.custom = 'error';
                    healthData.status = 'degraded';
                }
            }

            // Determinar status geral
            if (healthData.checks.database === 'unhealthy' || healthData.checks.custom === 'unhealthy') {
                healthData.status = 'unhealthy';
            } else if (healthData.checks.database === 'error' || healthData.checks.custom === 'error') {
                healthData.status = 'degraded';
            }

            // Calcular tempo de resposta
            healthData.responseTime = Date.now() - startTime;

            // Adicionar dados ao request para uso posterior
            req.healthData = healthData;

            // Log do healthcheck
            console.log(`🏥 Healthcheck [${routeName}]: ${healthData.status} - DB: ${healthData.checks.database}, Custom: ${healthData.checks.custom}, Response: ${healthData.responseTime}ms`);

            next();
        } catch (error) {
            healthData.status = 'error';
            healthData.error = error.message;
            healthData.responseTime = Date.now() - startTime;
            
            console.error(`❌ Healthcheck [${routeName}] Error:`, error.message);
            next();
        }
    };
}

/**
 * Verificar conexão com banco de dados
 * @returns {Promise<boolean>} Status da conexão
 */
async function checkDatabaseConnection() {
    try {
        const mongoose = require('mongoose');
        return mongoose.connection.readyState === 1;
    } catch (error) {
        return false;
    }
}

/**
 * Middleware para endpoint de healthcheck geral
 */
async function generalHealthCheck(req, res) {
    try {
        const healthData = {
            service: 'Oblivion Ecommerce API',
            version: '1.0.0',
            timestamp: new Date().toISOString(),
            status: 'healthy',
            uptime: process.uptime(),
            environment: process.env.NODE_ENV || 'development',
            checks: {
                database: await checkDatabaseConnection(),
                memory: process.memoryUsage(),
                cpu: process.cpuUsage()
            }
        };

        // Determinar status geral
        if (!healthData.checks.database) {
            healthData.status = 'degraded';
        }

        const statusCode = healthData.status === 'healthy' ? 200 : 503;
        
        res.status(statusCode).json(healthData);
    } catch (error) {
        res.status(500).json({
            service: 'Oblivion Ecommerce API',
            status: 'error',
            error: error.message,
            timestamp: new Date().toISOString()
        });
    }
}

/**
 * Middleware para endpoint de healthcheck detalhado
 */
async function detailedHealthCheck(req, res) {
    try {
        const detailedHealth = {
            service: 'Oblivion Ecommerce API',
            version: '1.0.0',
            timestamp: new Date().toISOString(),
            status: 'healthy',
            uptime: process.uptime(),
            environment: process.env.NODE_ENV || 'development',
            checks: {
                database: {
                    status: await checkDatabaseConnection(),
                    connection: 'MongoDB'
                },
                system: {
                    memory: process.memoryUsage(),
                    cpu: process.cpuUsage(),
                    platform: process.platform,
                    nodeVersion: process.version
                },
                routes: {
                    public: '/api/public',
                    private: '/api/private',
                    docs: '/api-docs'
                }
            }
        };

        const statusCode = detailedHealth.checks.database.status ? 200 : 503;
        
        res.status(statusCode).json(detailedHealth);
    } catch (error) {
        res.status(500).json({
            service: 'Oblivion Ecommerce API',
            status: 'error',
            error: error.message,
            timestamp: new Date().toISOString()
        });
    }
}

module.exports = {
    createHealthCheck,
    generalHealthCheck,
    detailedHealthCheck,
    checkDatabaseConnection
};
