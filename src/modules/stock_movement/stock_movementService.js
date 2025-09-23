//stock_movementService.js
const StockMovement = require("./stock_movementEntity");
const StockCategory = require("../stock_category/stock_categoryEntity");
const Product = require("../product/productEntity");
const User = require("../user/userEntity");
const { updateStock } = require("../product/productUtils");
const { prepareStockMovementData } = require("./stock_movementUtils");


//CREATE
const createStockMovement = async function(data) {
  try {
    const stockCategory = await StockCategory.findById(data.stockCategory.stockCategoryId);

    if (!stockCategory) {
        throw new Error('Categoria de estoque não encontrada');
    };

    const products = await Product.find({_id: {$in: data.products.map(product => product.productId)}});

    if (products.length !== data.products.length) {
        throw new Error('Produto não encontrado');
    };

    const admin = await User.findById(data.admin.adminId);

    if (!admin) {
        throw new Error('Administrador não encontrado');
    };
    
    const preparedData = await prepareStockMovementData(data);

    const stockMovement = new StockMovement(preparedData);
    const stockMovementSaved = await stockMovement.save();

    try {
      await updateStock(data.products, data.type);
    } catch (stockError) {
      await StockMovement.findByIdAndDelete(stockMovementSaved._id);
      throw new Error(`Erro ao atualizar estoque: ${stockError.message}`);
    }    

    return stockMovementSaved;
   }catch (error) {
    throw new Error(`Erro ao criar movimento de estoque ${error.message}`);
  };
};


//READ
const getAllStockMovements = async function() {
  try {
    return await StockMovement.find().sort({name: 1});
  } catch (error) {
    throw new Error(`Erro ao buscar todos os movimentos de estoque: ${error.message}`);
  };
};

const getStockMovementById = async function(id) {
  try {
    const stockMovement = await StockMovement.findById(id);

    if (!stockMovement) {
      throw new Error('Movimento de estoque não encontrado');
    };

    return stockMovement;
  } catch (error) {
    throw new Error(`Erro ao buscar movimento de estoque: ${error.message}`);
  };
};


module.exports = {
    createStockMovement,
    getAllStockMovements,
    getStockMovementById
};