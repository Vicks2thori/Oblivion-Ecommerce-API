//categoryController.js
const { createCategorySchema, updateCategorySchema } = require('./categoryDto');
const Category = require('./categoryService');


//CREATE
async function create(req, res) {
  try {
    const { error, value } = createCategorySchema.validate(req.body);

    //Dados inválidos
    if (error) {
      return res.status(400).json({
        success: false,
        message: `400 - Dados inválidos: ${error.details.map(d => d.message).join(', ')}`,
      });
    };

    const category = await Category.createCategory(value);
    
    //Sucesso
    res.status(200).json({
      success: true,
      message: '200 - Operação realizada com sucesso',
      data: category
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
    const category = await Category.getAllCategories();

    //Sucesso geral
    res.status(200).json({
      success: true,
      message: '200 - Operação realizada com sucesso',
      data: category
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
    const activeCategories = await Category.getCategoryById();

    //Sucesso
    res.status(200).json({
      success: true,
      message: '200 - Operação realizada com sucesso',
      data: activeCategories
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
    const activeCategories = await Category.getActiveCategories();

    //Sucesso
    res.status(200).json({
      success: true,
      message: '200 - Operação realizada com sucesso',
      data: activeCategories
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

    const { error, value } = updateCategorySchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: `400 - Dados inválidos: ${error.details.map(d => d.message).join(', ')}`,
      });
    };
    
    const result = await Category.updateCategory(id, value);
    
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
async function deleteCategory(req, res) {
  try {
    const { id } = req.params;
    const deleted = await Category.deleteCategory(id);

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
  getAll,
  getById,
  getActive,
  update,
  deleteCategory
};