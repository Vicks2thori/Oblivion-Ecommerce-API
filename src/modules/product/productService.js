//productService.js
const Product = require("./productEntity");


//CREATE
const createProduct = async function(data) {
  try { 
    const product = new Product(data);

    return await product.save();
  } catch (error) {
    throw new Error(`Erro ao criar produto: ${error.message}`);
  };
};


//READ
const getProductById = async function(id) {
  try {
    const getById = await Product.findById(id);
    
    if (!getById || getById.deleted) {
      throw new Error('Produto não encontrado');
    }
    
    return getById;
  } catch (error) {
    throw new Error(`Erro ao buscar produto: ${error.message}`);
  }
};


//UPDATE
const updateProduct = async function(id, updateData) {
  try {
    const product = await Product.findById(id);
    
    if (!product || product.deleted) {
      throw new Error('Produto não encontrado');
    };

    if (updateData.categoryId) {
      await addProductToCategoryWithTransfer(product._id, updateData.categoryId);
    };

    Object.assign(product, updateData);
    
    return await product.save();
  } catch (error) {
    throw new Error(`Erro ao atualizar produto: ${error.message}`);
  };
};


//DELETE
const deleteProduct = async function(id) {
 try {
    const product = await Product.findById(id);
    
    if (!product || product.deleted) {
      throw new Error('Produto não encontrado');
    };

    const deleted = await Product.findOneAndUpdate(
      {_id: id, deleted: false},
      {deleted: true},  
      {new: true}
    );
    
    if (!deleted) {
      throw new Error('Produto não encontrado');
    };
    
    return deleted;
  } catch (error) {
    throw new Error(`Erro ao deletar produto: ${error.message}`);
  };
};

module.exports = {
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct
};