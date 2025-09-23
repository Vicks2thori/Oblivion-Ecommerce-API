const Product = require("./productEntity");

// Atualiza estoque de UM produto
const updateStockProduct = async function(productId, quantity, type) {
  try {
    const product = await Product.findOne({
      _id: productId,
      deleted: false
    });

    if (!product) {
      throw new Error("Produto não encontrado ou já deletado");
    }

    if (quantity === 0) {
      throw new Error("Quantidade não pode ser igual a 0");
    }

    const quantityProduct = product.quantity;

    if (type === "entry") {
      product.quantity = quantityProduct + quantity;
    } else if (type === "definition") {
      product.quantity = quantity;
    } else if (type === "exit") {
      product.quantity = quantityProduct - quantity;
    }

    await product.save();
    return product;
  } catch (error) {
    throw new Error(`Erro ao alterar a quantidade do produto: ${error.message}`);
  }
};

// Atualiza estoque de VÁRIOS produtos com base no StockMovement
const updateStock = async function(products, type) {
  const updated = [];

  for (const { productId, quantity } of products) {
    const updatedProduct = await updateStockProduct(productId, quantity, type);
    updated.push(updatedProduct);
  }

  return updated;
};

module.exports = {
  updateStock
};