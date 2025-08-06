//categoryUtills.js

// Função para filtrar produtos ativos/inativos
const filterActiveProducts = (products, includeInactive = false) => {
  if (!products || !Array.isArray(products)) {
    return [];
  }

  return products.filter(product => {
    if (!product.productId) return false;
    
    if (includeInactive) {
      // Incluir todos os produtos não deletados
      return !product.productId.deleted;
    } else {
      // Incluir apenas produtos ativos e não deletados
      return product.productId.status && !product.productId.deleted;
    }
  });
};

// Função para adicionar produto à categoria com verificação de transferência
const addProductToCategoryWithTransfer = async (categoryId, productId) => {
  try {
    // Por enquanto, apenas retorna true
    // Esta função pode ser expandida quando o productEntity for migrado para MongoDB
    // ou quando implementarmos a lógica de verificação de transferência
    
    return true;
  } catch (error) {
    throw new Error(`Erro ao adicionar produto à categoria: ${error.message}`);
  }
};

module.exports = {
  filterActiveProducts,
  addProductToCategoryWithTransfer
}; 