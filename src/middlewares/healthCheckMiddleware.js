// middlewares/healthCheckMiddleware.js

const os = require('os');
const mongoose = require('mongoose');

/**
 * Fábrica de middleware de healthcheck.
 * Se "checkFn" for informado, responde com JSON do status desse check.
 * Caso contrário, apenas chama next() após logar o evento.
 */
const createHealthCheck = (name, checkFn) => {
  return async (req, res, next) => {
    try {
      console.log(`[${new Date().toISOString()}] Health check triggered${name ? `: ${name}` : ''}.`);

      if (typeof checkFn === 'function') {
        const ok = await checkFn();
        return res.status(ok ? 200 : 500).json({
          status: ok ? 'ok' : 'error',
          check: name || 'unnamed-check',
          timestamp: new Date(),
        });
      }

      return typeof next === 'function' ? next() : undefined;
    } catch (error) {
      console.error('Erro no healthcheck:', error);
      return res.status(500).json({ status: 'error', message: error.message });
    }
  };
};

/**
 * Checagem geral da API.
 */
const generalHealthCheck = (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'API está funcionando corretamente.',
    uptime: process.uptime(),
    timestamp: new Date(),
  });
};

/**
 * Checagem detalhada (banco de dados, memória, CPU, etc.).
 */
const detailedHealthCheck = async (req, res) => {
  try {
    // Verifica o estado da conexão com o MongoDB
    let dbStatus = 'disconnected';
    switch (mongoose.connection.readyState) {
      case 0:
        dbStatus = 'disconnected';
        break;
      case 1:
        dbStatus = 'connected';
        break;
      case 2:
        dbStatus = 'connecting';
        break;
      case 3:
        dbStatus = 'disconnecting';
        break;
    }

    const memoryUsage = process.memoryUsage();
    const cpuLoad = os.loadavg();

    res.status(200).json({
      status: 'ok',
      message: 'Todos os serviços estão operando normalmente.',
      details: {
        uptime: `${process.uptime().toFixed(2)}s`,
        database: {
          status: dbStatus,
          host: mongoose.connection.host,
          name: mongoose.connection.name,
        },
        memory: {
          rss: `${(memoryUsage.rss / 1024 / 1024).toFixed(2)} MB`,
          heapUsed: `${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`,
        },
        cpuLoad,
        timestamp: new Date(),
      },
    });
  } catch (error) {
    console.error('Erro na checagem detalhada:', error);
    res.status(500).json({
      status: 'error',
      message: 'Falha na checagem detalhada do sistema.',
      error: error.message,
    });
  }
};

module.exports = {
  createHealthCheck,
  generalHealthCheck,
  detailedHealthCheck,
};