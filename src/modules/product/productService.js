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

//Update Stock
const updateStock = async function({id, type, quantity}) {
  try {

    //verifica o tipo de movimentação e calcula o valor
    if (type == 'entry') {
      quantity = +quantity;
    } else if (type == 'exit') {
      quantity = -quantity;
    } else if (type == 'definition') {
      quantity = quantity;
    }

    //adciona o valor ao produto
    const updated = await Product.findOneAndUpdate(
      {_id: id, deleted: false },
      {quantity: quantity},
      {new: true, runValidators: true})
    
    if (!updated) {
      throw new Error('Produto não encontrado');
    }
    
    return updated;
  }catch (error) {
    throw new Error(`Erro ao atualizar estoque: ${error.message}`);
  }
};

//Update Stock by Movement - Atualiza estoque baseado na movimentação
const updateStockByMovement = async function(products, movementType) {
  try {
    const updatePromises = products.map(async (product) => {
      const { productId, quantity } = product;
      
      // Busca o produto atual para obter a quantidade atual
      const currentProduct = await Product.findById(productId);
      if (!currentProduct || currentProduct.deleted) {
        throw new Error(`Produto ${productId} não encontrado`);
      }
      
      let newQuantity;
      
      switch (movementType) {
        case 'entry':
          // Entrada: adiciona quantidade
          newQuantity = currentProduct.quantity + quantity;
          break;
        case 'exit':
          // Saída: subtrai quantidade
          newQuantity = currentProduct.quantity - quantity;
          // Verifica se não ficará negativo
          if (newQuantity < 0) {
            throw new Error(`Quantidade insuficiente para o produto ${currentProduct.name}. Estoque atual: ${currentProduct.quantity}, Tentativa de saída: ${quantity}`);
          }
          break;
        case 'definition':
          // Definição: define quantidade específica
          newQuantity = quantity;
          break;
        default:
          throw new Error(`Tipo de movimentação inválido: ${movementType}`);
      }
      
      // Atualiza o produto com a nova quantidade
      const updated = await Product.findOneAndUpdate(
        { _id: productId, deleted: false },
        { quantity: newQuantity },
        { new: true, runValidators: true }
      );
      
      if (!updated) {
        throw new Error(`Erro ao atualizar produto ${productId}`);
      }
      
      return updated;
    });
    
    // Executa todas as atualizações em paralelo
    const updatedProducts = await Promise.all(updatePromises);
    return updatedProducts;
    
  } catch (error) {
    throw new Error(`Erro ao atualizar estoque por movimentação: ${error.message}`);
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
    updateStock,
    updateStockByMovement,
    deleteProduct
};