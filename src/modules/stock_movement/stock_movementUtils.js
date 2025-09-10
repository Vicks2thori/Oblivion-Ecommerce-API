//stock_movementUtils.js
const mongoose = require('mongoose');

const getAdminSnapshot = async (adminId) => {
  try {
    const User = mongoose.model('User');
    const admin = await User.findById(adminId);

    if (!admin || admin.deleted) {
      throw new Error(`Admin com ID ${adminId} não encontrado`);
    };

    if (admin.type !== 'admin') {
      throw new Error(`Usuário com ID ${adminId} não é um admin`);
    };

    return {
      adminId: admin._id,
      nameAdmin: admin.name,
    };
  } catch (error) {
    throw new Error(`Erro ao buscar dados do admin: ${error.message}`);
  };
};

const getProductSnapshot = async (productId) => {
  try {
    const Product = mongoose.model('Product');
    const product = await Product.findById(productId);

    if (!product || product.deleted) {
      throw new Error(`Produto com ID ${productId} não encontrado`);
    };

    if (!product.status) {
      throw new Error(`Produto ${product.name} não está disponível`);
    };

    return {
      productId: product._id,
      nameProduct: product.name
    };
  } catch (error) {
    throw new Error(`Erro ao buscar dados do produto: ${error.message}`);
  };
};

const getStockCategorySnapshot = async (stockCategoryId) => {
  try {
    const StockCategory = mongoose.model('StockCategory');
    const stockCategory = await StockCategory.findById(stockCategoryId);

    if (!stockCategory || stockCategory.deleted) {
      throw new Error(`Categoria de estoque com ID ${stockCategoryId} não encontrada`);
    };

    if (!stockCategory.status) {
      throw new Error(`Categoria de estoque ${stockCategory.name} não está ativa`);
    };

    return {
      stockCategoryId: stockCategory._id,
      nameStockCategory: stockCategory.name
    };
  } catch (error) {
    throw new Error(`Erro ao buscar dados da categoria de estoque: ${error.message}`);
  }
};

const prepareStockMovementData = async (movementData) => {
  try {
    const { admin, products, stockCategory, ...otherData } = movementData;

    const adminSnapshot = await getAdminSnapshot(admin.adminId);

    const preparedProducts = [];
    for (const productItem of products) {
      const productSnapshot = await getProductSnapshot(productItem.productId);

      preparedProducts.push({
        ...productSnapshot,
        quantity: productItem.quantity,
      });
    };

    const stockCategorySnapshot = await getStockCategorySnapshot(stockCategory.stockCategoryId);

    return {
      ...otherData,
      admin: adminSnapshot,
      products: preparedProducts,
      stockCategory: stockCategorySnapshot
    };
  } catch (error) {
    throw new Error(`Erro ao preparar dados da movimentação: ${error.message}`);
  };
};

module.exports = { prepareStockMovementData };