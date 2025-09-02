// cors-usage-example.js
// Exemplo de como usar a configuração do CORS no servidor

const express = require('express');
const cors = require('cors');
const corsOptions = require('./cors');

const app = express();

// Aplicar CORS com as opções configuradas
app.use(cors(corsOptions));

// OU, se quiser aplicar apenas em rotas específicas:
// app.use('/api', cors(corsOptions));

// OU, se quiser aplicar CORS globalmente sem configuração:
// app.use(cors()); // Permite tudo por padrão

// Suas rotas aqui...
app.get('/', (req, res) => {
  res.json({ message: 'API funcionando com CORS configurado!' });
});

// Para aplicar CORS apenas em rotas específicas:
app.use('/api/public', cors(corsOptions));
app.use('/api/private', cors(corsOptions));

module.exports = app;
