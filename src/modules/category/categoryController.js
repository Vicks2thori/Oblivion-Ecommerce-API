//categoryController.js
const categoryService = require('./categoryService');
const { createCategorySchema, updateCategorySchema } = require('./categoryDto');

// Create category
const createCategory = async (req, res) => {
  try {
    const { error, value } = createCategorySchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const category = await categoryService.createCategory(value);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all categories (admin)
const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get active categories (e-commerce)
const getActiveCategories = async (req, res) => {
  try {
    const categories = await categoryService.getActiveCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update category
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = updateCategorySchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const category = await categoryService.updateCategory(id, value);
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete category (soft delete)
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryService.deleteCategory(id);
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getActiveCategories,
  updateCategory,
  deleteCategory
};


//categoryController.js
const { createCategorySchema, updateCategorySchema } = require('./categoryDto');
const Category = require('./categoryService');
//const { badRequest400, responseHelpersOk, responseHelpersError } = require("../../../routes/responseHelpers"); futuramente qando estiver funcionando

//CRUD

//Create
async function create(req, res) {
  try {
    //Validar DTO
    const { error, value } = createCategorySchema.validate(req.body); //validate do Joi retorna um erro(null se estiver ok) e os valores
    if (error) {
      //400 - Dados inválidos
      return res.status(400).json({
        success: false,
        message: '400 - Dados inválidos',
        errors: error.details.map(d => d.message) //extrai só as mensagens
      });
    };

    //Criar através do Service
    const category = await Category.createCategory(value);

    //200 - Sucesso geral
    res.status(200).json({
      success: true,
      message: '200 - Operação realizada com sucesso',
      data: category
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
    const category = await Category.getAllCategories();

    //OK
    //200 - Sucesso geral
    res.status(200).json({
      success: true,
      message: '200 - Operação realizada com sucesso',
      data: category
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
    const activeCategories = await Category.getActiveCategories();

    //200 - Sucesso geral
    res.status(200).json({
      success: true,
      message: '200 - Operação realizada com sucesso',
      data: activeCategories
    });

  }catch (error) {
    //500 - Erro interno do servidor
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

//Update
async function update(req, res) {
  try {
    const { id } = req.params;

    const { error, value } = updateCategorySchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        errors: error.details.map(d => d.message) // ✅ Só aqui usar .details
      });
    }
    
    const result = await Category.updateCategory(id, value);
    
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
async function deleteCategory(req, res) {
  try {
    const { id } = req.params;
    const deleted = await Category.deleteCategory(id);

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
  update,
  deleteCategory
};