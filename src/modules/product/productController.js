//productController.js
const { createProductSchema, updateProductSchema } = require('./productDto');
const Product = require('./productService');


//CREATE
async function create(req, res) {
  try {
    const { error, value } = createProductSchema.validate(req.body);

    if (error) {
      //Dados inválidos
      return res.status(400).json({
        success: false,
        message: `400 - Dados inválidos: ${error.details.map(d => d.message).join(', ')}`
      });
    };
    
    const product = await Product.createProduct(value);

    //Sucesso
    res.status(200).json({
      success: true,
      message: '200 - Operação realizada com sucesso',
      data: product
    });

  } catch (error) {
    //Erro interno do servidor
    return res.status(500).json({
      success: false,
      message: error.message
    });
  };
};


//READ
async function getById(req, res) {
  try {
    const { id } = req.params;
    const product = await Product.getProductById(id);

    //Sucesso
    res.status(200).json({
      success: true,
      message: '200 - Operação realizada com sucesso',
      data: product
    });

  } catch (error) {
    //Erro interno do servidor
    return res.status(500).json({
      success: false,
      message: error.message 
    });
  };
};


//UPDATE
async function update(req, res) {
  try {
    const { id } = req.params;
    const { error, value } = updateProductSchema.validate(req.body);

    if (error) {
      //Dados inválidos
      return res.status(400).json({
        success: false,
        message: `400 - Dados inválidos: ${error.details.map(d => d.message).join(', ')}`
      });
    };
    
    const result = await Product.updateProduct(id, value);
    
    //Sucesso
    return res.status(200).json({
      success: true,
      data: result
    });
    
  } catch (error) {
    //Erro interno do servidor
    return res.status(500).json({
      success: false,
      message: error.message
    });
  };
};


//DELETE
async function deleteProduct(req, res) {
  try {
    const { id } = req.params;
    const deleted = await Product.deleteProduct(id);

    //Sucesso
    res.status(200).json({
      success: true,
      message: '200 - Operação realizada com sucesso',
      data: deleted
    });

  } catch (error) {
    //Erro interno do servidor
    return res.status(500).json({
      success: false,
      message: error.message
    });
  };
};


module.exports = {
  create,
  getById,
  update,
  deleteProduct
};