//payment_conditionController.js
const { createStockCategorySchema, updateStockCategorySchema } = require('./stock_categoryDto');
const StockCategory = require('./stock_categoryService');


//CREATE
async function create(req, res) {
  try {
    const { error, value } = createStockCategorySchema.validate(req.body);
    if (error) {
      //Dados inválidos
      return res.status(400).json({
        success: false,
        message: '400 - Dados inválidos',
        errors: error.details.map(d => d.message)
      });
    };

    const stockCategory = await StockCategory.createStockCategory(value);

    //Sucesso
    res.status(200).json({
      success: true,
      message: '200 - Operação realizada com sucesso',
      data: stockCategory
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
async function getAll(req, res) {
  try {
    const stockCategory = await StockCategory.getAllStockCategories();

    //Sucesso
    res.status(200).json({
      success: true,
      message: '200 - Operação realizada com sucesso',
      data: stockCategory
    });
  } catch (error) {
    //Erro interno do servidor
    return res.status(500).json({
      success: false,
      message: error.message
    });
  };
};

async function getActive(req, res) {
  try {
    const activeStockCategories = await StockCategory.getActiveStockCategories();

    //Sucesso
    res.status(200).json({
      success: true,
      message: '200 - Operação realizada com sucesso',
      data: activeStockCategories
    });
  } catch (error) {
    //Erro interno do servidor
    return res.status(500).json({
      success: false,
      message: error.message
    });
  };
};

async function getById(req, res) {
  try {
    const { id } = req.params;
    const stockCategory = await StockCategory.getStockCategoryById(id);

    //Sucesso
    res.status(200).json({
      success: true,
      message: '200 - Operação realizada com sucesso',
      data: stockCategory
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
    const { error, value } = updateStockCategorySchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        errors: error.details.map(d => d.message)
      });
    };
    
    const result = await StockCategory.updateStockCategory(id, value);
    
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
async function deleteStockCategory(req, res) {
  try {
    const { id } = req.params;
    const deleted = await StockCategory.deleteStockCategory(id);

    //Sucesso geral
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
  };
};


module.exports = {
  create,
  getAll,
  getActive,
  getById,
  update,
  deleteStockCategory
};