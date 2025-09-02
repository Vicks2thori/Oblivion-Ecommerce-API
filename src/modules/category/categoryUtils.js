//categoryUtills.js
const Category = require("./categoryEntity");

const filterProducts = (products, status = 'all') => {
  if (status === 'active') {
    return products
      .map(p => p.productId)
      .filter(product => product && !product.deleted && product.status);
  } else {
    return products
      .map(p => p.productId)
      .filter(product => product && !product.deleted);
  };
};

const removeProductFromAllCategories = async function(productId) {
  try {
    const categories = await Category.find({
      'productsList.productId': productId,
      deleted: false
    });

    if (!categories || categories.length === 0) return;
    for (const category of categories) {
      category.productsList = category.productsList.filter(
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

    const existsInTarget = targetCategory.productsList.some(
      p => p.productId.toString() === productId.toString()
    );
    
    if (existsInTarget) {
      return;
    };

    await removeProductFromAllCategories(productId);

    targetCategory.productsList.push({ productId });

    await targetCategory.save();
  } catch (error) {
    throw new Error(`Erro ao transferir produto para categoria: ${error.message}`);
  };
};


module.exports = {
    filterProducts,
    addProductToCategoryWithTransfer
};