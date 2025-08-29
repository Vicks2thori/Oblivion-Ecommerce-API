//categoryUtills.js
const Category = require("./categoryEntity");

const filterActiveProducts = (products, includeInactive = false) => {
  return products
    .map(p => p.productId)
    .filter(product => product && !product.deleted && (includeInactive || product.status));
};

const removeProductFromAllCategories = async function(productId) {
  try {
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
    };
  } catch (error) {
    throw new Error(`Erro ao remover produto de todas as categorias: ${error.message}`);
  };
};

const addProductToCategoryWithTransfer = async function(targetCategoryId, productId) {
  try {
    const targetCategory = await Category.findById(targetCategoryId);
    if (!targetCategory || targetCategory.deleted) {
      throw new Error('Categoria de destino não encontrada');
    };

    const existsInTarget = targetCategory.products.some(
      p => p.productId.toString() === productId.toString()
    );
    
    if (existsInTarget) {
      return;
    };

    await removeProductFromAllCategories(productId);

    targetCategory.products.push({ productId });

    await targetCategory.save();
  } catch (error) {
    throw new Error(`Erro ao transferir produto para categoria: ${error.message}`);
  };
};


module.exports = {
    filterActiveProducts,
    removeProductFromAllCategories,
    addProductToCategoryWithTransfer
};