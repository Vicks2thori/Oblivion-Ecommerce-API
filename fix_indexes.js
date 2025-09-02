// Script para corrigir índices do banco de dados
const mongoose = require('mongoose');

async function fixIndexes() {
  try {
    // Conectar ao banco
    await mongoose.connect('mongodb://localhost:27017/test', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('Conectado ao banco de dados');

    // Remover índices problemáticos
    const db = mongoose.connection.db;
    const collection = db.collection('users');

    // Remover todos os índices existentes (exceto _id)
    const indexes = await collection.indexes();
    console.log('Índices existentes:', indexes);

    for (let index of indexes) {
      if (index.name !== '_id_') {
        console.log(`Removendo índice: ${index.name}`);
        await collection.dropIndex(index.name);
      }
    }

    console.log('Índices removidos com sucesso');

    // Recriar índices corretos
    console.log('Recriando índices...');

    // Email único
    await collection.createIndex({ email: 1 }, { unique: true });
    console.log('Índice de email criado');

    // Tipo
    await collection.createIndex({ type: 1 });
    console.log('Índice de tipo criado');

    // Composto principal
    await collection.createIndex({ deleted: 1, type: 1 });
    console.log('Índice composto criado');

    // CPF (só para clientes)
    await collection.createIndex(
      { 'clientDetails.cpf': 1 }, 
      { 
        unique: true, 
        sparse: true,
        partialFilterExpression: { 
          type: 'client',
          deleted: false,
          'clientDetails.cpf': { $exists: true, $ne: null, $ne: '' }
        }
      }
    );
    console.log('Índice de CPF criado');

    // Telefone (só para clientes)
    await collection.createIndex(
      { 'clientDetails.cell': 1 }, 
      { 
        unique: true, 
        sparse: true,
        partialFilterExpression: { 
          type: 'client',
          deleted: false,
          'clientDetails.cell': { $exists: true, $ne: null, $ne: '' }
        }
      }
    );
    console.log('Índice de telefone criado');

    console.log('Todos os índices foram recriados com sucesso!');

  } catch (error) {
    console.error('Erro ao corrigir índices:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Desconectado do banco de dados');
  }
}

// Executar o script
fixIndexes();
