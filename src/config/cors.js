// cors.js
// Configuração do CORS para permitir acesso de qualquer origem

const corsOptions = {
  // Permitir qualquer origem
  origin: function (origin, callback) {
    // Permitir requisições sem origem (como aplicações mobile, Postman, etc.)
    if (!origin) return callback(null, true);
    
    // Permitir qualquer origem
    callback(null, true);
  },
  
  // Permitir credenciais (cookies, headers de autorização)
  credentials: true,
  
  // Permitir todos os métodos HTTP
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  
  // Permitir todos os headers
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
    'X-Auth-Token',
    'Cache-Control',
    'Pragma',
    'Expires'
  ],
  
  // Headers expostos para o cliente
  exposedHeaders: [
    'Content-Length',
    'X-Total-Count',
    'X-Page-Count'
  ],
  
  // Tempo máximo que o navegador pode fazer preflight request
  maxAge: 86400, // 24 horas
  
  // Permitir preflight requests
  preflightContinue: false,
  
  // Opções para debug (remover em produção)
  optionsSuccessStatus: 200
};

module.exports = corsOptions;
