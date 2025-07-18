//productController.js
const { createProductSchema, updateProductSchema } = require('./productDto');
const Product = require('./productService');
//const { badRequest400, responseHelpersOk, responseHelpersError } = require("../../../routes/responseHelpers"); futuramente qando estiver funcionando

//CRUD

//Create
async function create(req, res) {
  try {
    //Validar DTO
    const { error, value } = createProductSchema.validate(req.body); //validate do Joi retorna um erro(null se estiver ok) e os valores
    if (error) {
      //400 - Dados inválidos
      return res.status(400).json({
        success: false,
        message: '400 - Dados inválidos',
        errors: error.details.map(d => d.message) //extrai só as mensagens
      });
    };

    //Criar através do Service
    const product = await Product.createProduct(value);

    //200 - Sucesso geral
    res.status(200).json({
      success: true,
      message: '200 - Operação realizada com sucesso',
      data: product
    });


  }catch (error) {
    //500 - Erro interno do servidor
    return res.status(500).json({
      success: false,
      message: error.message
    });
  };
};


//Read

//All
async function getAll(req, res) {
  try {
    const product = await Product.getAllProducts();

    //OK
    //200 - Sucesso geral
    res.status(200).json({
      success: true,
      message: '200 - Operação realizada com sucesso',
      data: product
    });

  } catch (error) {
    //500 - Erro interno do servidor
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

//Active
async function getActive(req, res) {
  try {
    const activeProducts = await Product.getActiveProducts();

    //200 - Sucesso geral
    res.status(200).json({
      success: true,
      message: '200 - Operação realizada com sucesso',
      data: activeProducts
    });

  }catch (error) {
    //500 - Erro interno do servidor
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

//By ID
async function getById(req, res) {
  try {
    const { id } = req.params;
    const product = await Product.getProductById(id);

    //200 - Sucesso geral
    res.status(200).json({
      success: true,
      message: '200 - Operação realizada com sucesso',
      data: product
    });

  }catch (error) {
    //500 - Erro interno do servidor
    return res.status(500).json({
      success: false,
      message: error.message 
    });
  };
};


//Update
async function update(req, res) {
  try {
    const { id } = req.params;

    const { error, value } = updateProductSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        errors: error.details.map(d => d.message) // ✅ Só aqui usar .details
      });
    }
    
    const result = await Product.updateProduct(id, value);
    
    //200 - Sucesso geral
    return res.status(200).json({
      success: true,
      data: result
    });
    
  } catch (error) {
    //500 - Erro interno do servidor
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

//Delete
async function deleteProduct(req, res) {
  try {
    const { id } = req.params;
    const deleted = await Product.deleteProduct(id);

    //200 - Sucesso geral
    res.status(200).json({
      success: true,
      message: '200 - Operação realizada com sucesso',
      data: deleted
    });

  } catch (error) {
    //500 - Erro interno do servidor
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

module.exports = {
  create,
  getAll,
  getActive,
  getById,
  update,
  deleteProduct
};