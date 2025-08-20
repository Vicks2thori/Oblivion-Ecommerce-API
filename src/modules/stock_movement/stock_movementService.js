//stock_movementService.js
const StockMovement = require("./stock_movementEntity");
const StockCategory = require("../stock_category/stock_categoryEntity");
const Product = require("../product/productEntity");
const User = require("../user/userEntity");
const { updateStock } = require("../product/productService");

//Create
const createStockMovement = async function(data) {
  try {
    //validando a categoria de estoque
    const stockCategory = await StockCategory.findById(data.stockCategoryId);
    if (!stockCategory) {
        throw new Error('Categoria de estoque não encontrada');
    }

    //validando os produtos
    const products = await Product.find({_id: {$in: data.products.map(product => product.productId)}});
    if (products.length !== data.products.length) {
        throw new Error('Produto não encontrado');
    }

    //validando o administrador
    const admin = await User.findById(data.adminId);
    if (!admin) {
        throw new Error('Administrador não encontrado');
    }

    //função para adicionar a movimentação na categoria de estoque
    //CRIAR

    const stockMovement = new StockMovement(data);//cria um novo
    const stockMovementSaved = await stockMovement.save(); //salva no banco

    //função para atualizar o estoque dos produtos
    try {
      await updateStock(data.products, data.type);
    } catch (stockError) {
      // Se falhar ao atualizar o estoque, remove a movimentação criada
      await StockMovement.findByIdAndDelete(stockMovementSaved._id);
      throw new Error(`Erro ao atualizar estoque: ${stockError.message}`);
    }

    return stockMovementSaved; //retorna o movimento de estoque salvo
  }catch (error) {
    throw new Error(`Erro ao criar movimento de estoque ${error.message}`);
  }
};


//Read
//All
const getAllStockMovements = async function() {
  try {
    return await StockMovement.find().sort({name: 1});
  }catch (error) {
    throw new Error(`Erro ao buscar todos os movimentos de estoque: ${error.message}`);
  }
};

const getStockMovementById = async function(id) {
  try {
    const stockMovement = await StockMovement.findById(id);
    if (!stockMovement) {
      throw new Error('Movimento de estoque não encontrado');
    }
    return stockMovement;
  }
  catch (error) {
    throw new Error(`Erro ao buscar movimento de estoque: ${error.message}`);
  }
};


module.exports = {
    createStockMovement,
    getAllStockMovements,
    getStockMovementById
};