//stock_categoryService.js
const StockCategory = require("./stock_categoryEntity");

//CRUD

//Create
const createStockCategory = async function(data) {
  try { 
    const stockCategory = new StockCategory(data); //cria um novo
    return await stockCategory.save(); //salva no banco
  }catch (error) {
    throw new Error(`Erro ao criar categoria de estoque: ${error.message}`);
  }
};


//Read
//All
const getAllStockCategories = async function() {
  try {
    return await StockCategory.find({deleted: false}).sort({name: 1});
  }catch (error) {
    throw new Error(`Erro ao buscar todas as categorias de estoque: ${error.message}`);
  }
};

//Active
const getActiveStockCategories = async function() {
  try {
    return await StockCategory.find({
      deleted: false,
      status: true 
    }).sort({ name: 1 });
  }catch (error) {
    throw new Error(`Erro ao buscar categorias de estoque ativas: ${error.message}`);
  }
};

//By ID
const getStockCategoryById = async function(id) {
  try {
    const getById = await StockCategory.findById(id);
    
    if (!getById || getById.deleted) { //se não encontrou ou encontrou e esta deletada
      throw new Error('Categoria de estoque não encontrada'); //cria um novo erro
    }
    
    return getById;
  } catch (error) {
    throw new Error(`Erro ao buscar categoria de estoque: ${error.message}`);
  }
};


//Update
const updateStockCategory = async function(id, updateData) {
  try {
    const updated = await StockCategory.findOneAndUpdate(
      {_id: id, deleted: false }, //só atualiza se não foi deletado
      updateData, 
      {new: true, runValidators: true}
    );
    
    if (!updated) {
      throw new Error('Categoria de estoque não encontrada'); //novo erro caso não encontre
    }
    
    return updated;
  } catch (error) {
    throw new Error(`Erro ao atualizar categoria de estoque: ${error.message}`);
  }
};


//Delete (soft delete)
const deleteStockCategory = async function(id) {
 try {
    const deleted = await StockCategory.findOneAndUpdate(
      {_id: id, deleted: false},
      {deleted: true},
      {new: true}
    );
    
    if (!deleted) {
      throw new Error('Categoria de estoque não encontrada');
    }
    
    return deleted;
  } catch (error) {
    throw new Error(`Erro ao deletar categoria de estoque: ${error.message}`);
  }
};

module.exports = {
    createStockCategory,
    getAllStockCategories,
    getActiveStockCategories,
    getStockCategoryById,
    updateStockCategory,
    deleteStockCategory
};