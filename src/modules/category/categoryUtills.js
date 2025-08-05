//categoryUtills.js
const Category = require("./categoryEntity");

// Função utilitária para filtrar produtos ativos e não deletados
const filterActiveProducts = (products, includeInactive = false) => {
  return products
    .map(p => p.productId) // products é um array de { productId: { ... } }
    .filter(product => product && !product.deleted && (includeInactive || product.status));
};

// Função para remover produto de todas as categorias
const removeProductFromAllCategories = async function(productId) {
  try {
    // Busca todas as categorias que contenham o produto
    const categories = await Category.find({
      'products.productId': productId,
      deleted: false
    });
    if (!categories || categories.length === 0) return;
    for (const category of categories) {
      category.products = category.products.filter(
        p => p.productId.toString() !== productId.toString()
      );
      await category.save();
    }
  } catch (error) {
    throw new Error(`Erro ao remover produto de todas as categorias: ${error.message}`);
  }
};

// Função para adicionar produto à categoria com verificação de transferência
const addProductToCategoryWithTransfer = async function(targetCategoryId, productId) {
  try {
    const targetCategory = await Category.findById(targetCategoryId);
    if (!targetCategory || targetCategory.deleted) {
      throw new Error('Categoria de destino não encontrada');
    }

    // Verificar se o produto já existe na categoria de destino
    const existsInTarget = targetCategory.products.some(
      p => p.productId.toString() === productId.toString()
    );
    
    if (existsInTarget) {
      return; // Produto já está na categoria de destino
    }

    // Remover de todas as categorias antes de adicionar
    await removeProductFromAllCategories(productId);

    // Adicionar à categoria de destino
    targetCategory.products.push({ productId });
    await targetCategory.save();
  } catch (error) {
    throw new Error(`Erro ao transferir produto para categoria: ${error.message}`);
  }
};

module.exports = {
    filterActiveProducts,
    removeProductFromAllCategories,
    addProductToCategoryWithTransfer
};