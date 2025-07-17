//categoryService.js
const Category = require("./categoryEntity");

//CRUD

//Create
const createCategory = async function(data) {
  try { 
    const category = new Category(data); //cria um novo
    return await category.save(); //salva no banco
  }catch (error) {
    throw new Error(`Erro ao criar categoria: ${error.message}`);
  }
};


//Read
//All
const getAllCategories = async function() {
  try {
    return await Category.find({deleted: false}).sort({name: 1});
  }catch (error) {
    throw new Error(`Erro ao buscar todas as categorias: ${error.message}`);
  }
};

//Active
const getActiveCategories = async function() {
  try {
    return await Category.find({
      deleted: false,
      status: true 
    }).sort({ name: 1 });
  }catch (error) {
    throw new Error(`Erro ao buscar categorias ativas: ${error.message}`);
  }
};

//By ID
const getCategoryById = async function(id) {
  try {
    const getById = await Category.findById(id);
    
    if (!getById || getById.deleted) { //se não encontrou ou encontrou e esta deletada
      throw new Error('Categoria não encontrada'); //cria um novo erro
    }
    
    return getById;
  } catch (error) {
    throw new Error(`Erro ao buscar categoria: ${error.message}`);
  }
};


//Update
const updateCategory = async function(id, updateData) {
  try {
    const updated = await Category.findOneAndUpdate(
      {_id: id, deleted: false }, //só atualiza se não foi deletado
      updateData, 
      {new: true, runValidators: true})
    
    if (!updated) {
      throw new Error('Categoria não encontrada'); //novo erro caso não encontre
    }
    
    return updated;
  } catch (error) {
    throw new Error(`Erro ao atualizar categoria: ${error.message}`);
  }
};


//Delete (soft delete)
const deleteCategory = async function(id) {
 try {
    const deleted = await Category.findOneAndUpdate(
      {_id: id, deleted: false},
      {deleted: true},
      {new: true}
    );
    
    if (!deleted) {
      throw new Error('Categoria não encontrada');
    }
    
    return deleted;
  } catch (error) {
    throw new Error(`Erro ao deletar categoria: ${error.message}`);
  }
};

module.exports = {
    createCategory,
    getAllCategories,
    getActiveCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
};