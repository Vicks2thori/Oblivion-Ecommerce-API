//productService.js
const Product = require("./productEntity");

//CRUD

//Create
const createProduct = async function(data) {
  try { 
    const product = new Product(data); //cria um novo
    return await product.save(); //salva no banco
  }catch (error) {
    throw new Error(`Erro ao criar produto: ${error.message}`);
  }
};


//Read
//All
const getAllProducts = async function() {
  try {
    return await Product.find({deleted: false}).sort({name: 1});
  }catch (error) {
    throw new Error(`Erro ao buscar todos os produtos: ${error.message}`);
  }
};

//Active
const getActiveProducts = async function() { //faz sentido se eu relacionar na categoria?
  try {
    return await Product.find({
      deleted: false,
      status: true 
    }).sort({ name: 1 });
  }catch (error) {
    throw new Error(`Erro ao buscar produtos ativos: ${error.message}`);
  }
};

//By ID
const getProductById = async function(id) {
  try {
    const getById = await Product.findById(id);
    
    if (!getById || getById.deleted) { //se não encontrou ou encontrou e esta deletada
      throw new Error('Produto não encontrado'); //cria um novo erro
    }
    
    return getById;
  } catch (error) {
    throw new Error(`Erro ao buscar produto: ${error.message}`);
  }
};


//Update
const updateProduct = async function(id, updateData) {
  try {
    const updated = await Product.findOneAndUpdate(
      {_id: id, deleted: false }, //só atualiza se não foi deletado
      updateData, 
      {new: true, runValidators: true})
    
    if (!updated) {
      throw new Error('Produto não encontrado'); //novo erro caso não encontre
    }
    
    return updated;
  } catch (error) {
    throw new Error(`Erro ao atualizar produto: ${error.message}`);
  }
};


//Delete (soft delete)
const deleteProduct = async function(id) {
 try {
    const deleted = await Product.findOneAndUpdate(
      {_id: id, deleted: false},
      {deleted: true},
      {new: true}
    );
    
    if (!deleted) {
      throw new Error('Produto não encontrado');
    }
    
    return deleted;
  } catch (error) {
    throw new Error(`Erro ao deletar produto: ${error.message}`);
  }
};

module.exports = {
    createProduct,
    getAllProducts,
    getActiveProducts,
    getProductById,
    updateProduct,
    deleteProduct
};