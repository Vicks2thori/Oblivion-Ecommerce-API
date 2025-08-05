//productService.js
const Product = require("./productEntity");
const { addProductToCategoryWithTransfer, removeProductFromAllCategories } = require("../category/categoryUtills");

//CRUD

//Create
const createProduct = async function(data) {
  try { 
    const product = new Product(data); //cria um novo
    const savedProduct = await product.save(); //salva no banco
    
    // Adicionar produto à categoria (com verificação de transferência)
    await addProductToCategoryWithTransfer(data.categoryId, savedProduct._id);
    
    return savedProduct;
  }catch (error) {
    throw new Error(`Erro ao criar produto: ${error.message}`);
  }
};


//Read
//All
const getAllProducts = async function() {
  try {
    return await Product.find({deleted: false})
      .populate('categoryId', 'name')
      .sort({name: 1});
  }catch (error) {
    throw new Error(`Erro ao buscar todos os produtos: ${error.message}`);
  }
};

//By ID
const getProductById = async function(id) { //preciso validar como vou incrementar no order
  try {
    const getById = await Product.findById(id)
    
    if (!getById || getById.deleted) { //se não encontrou ou encontrou e esta deletada
      throw new Error('Produto não encontrado'); //cria um novo erro
    }
    
    return getById;
  } catch (error) {
    throw new Error(`Erro ao buscar produto: ${error.message}`);
  }
};


//Update com lógica de relacionamentos
const updateProduct = async function(id, updateData) {
  try {
    const product = await Product.findById(id);
    
    if (!product || product.deleted) {
      throw new Error('Produto não encontrado');
    }

    // Se a categoria mudou, transferir produto
    if (updateData.categoryId && updateData.categoryId.toString() !== product.categoryId.toString()) {
      await addProductToCategoryWithTransfer(updateData.categoryId, product._id);
    }

    // Atualizar outros campos
    const updated = await Product.findOneAndUpdate(
      {_id: id, deleted: false },
      updateData, 
      {new: true, runValidators: true}
    );
    
    return updated;
  } catch (error) {
    throw new Error(`Erro ao atualizar produto: ${error.message}`);
  }
};


//Delete (soft delete)
const deleteProduct = async function(id) {
 try {
    const product = await Product.findById(id);
    
    if (!product || product.deleted) {
      throw new Error('Produto não encontrado');
    }
    
    // Remover produto de todas as categorias
    await removeProductFromAllCategories(product._id);
    
    const deleted = await Product.findOneAndUpdate(
      {_id: id, deleted: false},
      {deleted: true},
      {new: true}
    );
    
    return deleted;
  } catch (error) {
    throw new Error(`Erro ao deletar produto: ${error.message}`);
  }
};

module.exports = {
    createProduct,
    getAllProducts, 
    getProductById,
    updateProduct,
    deleteProduct
};