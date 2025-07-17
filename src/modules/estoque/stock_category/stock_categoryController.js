//payment_conditionController.js
const { createStockCategorySchema, updateStockCategorySchema } = require('./stock_categoryDto');
const StockCategory = require('./stock_categoryService');
//const { badRequest400, responseHelpersOk, responseHelpersError } = require("../../../routes/responseHelpers"); futuramente qando estiver funcionando

//CRUD

//Create
async function create(req, res) {
  try {
    //Validar DTO
    const { error, value } = createStockCategorySchema.validate(req.body); //validate do Joi retorna um erro(null se estiver ok) e os valores
    if (error) {
      //400 - Dados inválidos
      return res.status(400).json({
        success: false,
        message: '400 - Dados inválidos',
        errors: error.details.map(d => d.message) //extrai só as mensagens
      });
    };

    //Criar através do Service
    const stockCategory = await StockCategory.createStockCategory(value);

    //200 - Sucesso geral
    res.status(200).json({
      success: true,
      message: '200 - Operação realizada com sucesso',
      data: stockCategory
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
    const stockCategory = await StockCategory.getAllStockCategories();

    //OK
    //200 - Sucesso geral
    res.status(200).json({
      success: true,
      message: '200 - Operação realizada com sucesso',
      data: stockCategory
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
    const activeStockCategories = await StockCategory.getActiveStockCategories();

    //200 - Sucesso geral
    res.status(200).json({
      success: true,
      message: '200 - Operação realizada com sucesso',
      data: activeStockCategories
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
    const stockCategory = await StockCategory.getStockCategoryById(id);

    //200 - Sucesso geral
    res.status(200).json({
      success: true,
      message: '200 - Operação realizada com sucesso',
      data: stockCategory
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

    const { error, value } = updateStockCategorySchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        errors: error.details.map(d => d.message) // ✅ Só aqui usar .details
      });
    }
    
    const result = await StockCategory.updateStockCategory(id, value);
    
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
async function deleteStockCategory(req, res) {
  try {
    const { id } = req.params;
    const deleted = await StockCategory.deleteStockCategory(id);

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
  deleteStockCategory
};