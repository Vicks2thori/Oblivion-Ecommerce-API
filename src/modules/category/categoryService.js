//categoryService.js
const Category = require("./categoryEntity");
const { filterProducts } = require("./categoryUtils");


//CREATE
const createCategory = async function(data) {
  try { 
    const category = new Category(data);

    return await category.save();
  } catch (error) {
    throw new Error(`Erro ao criar categoria: ${error.message}`);
  };
};


//READ
const getAllCategories = async function() {
  try {
    return await Category.find({categoryDeleted: false})
      .populate({
        path: 'productsList.productId',
        match: { deleted: false },
        select: 'name imageUrl description price code quantity status deleted'
      })
      .sort({name: 1})
      .then(categories => {
        return categories.map(category => {
          const products = filterProducts(category.productsList);
          
          return {
            _id: category._id,
            name: category.name,
            products: products,
            status: category.status,
            createdAt: category.createdAt,
            updatedAt: category.updatedAt
          };
        });
      });
  } catch (error) {
    throw new Error(`Erro ao buscar todas as categorias: ${error.message}`);
  };
};

const getCategoryById = async function(id) {
  try {
    const category = await Category.findById(id);

    if (!category) {
      throw new Error('Categoria não encontrada');
    }

    return category;
  } catch (error) {
    throw new Error(`Erro ao buscar categoria por ID: ${error.message}`);
  };
};

const getActiveCategories = async function() {
  try {
    return await Category.find({
      categoryDeleted: false,
      status: true 
    })
    .populate({
      path: 'productsList.productId',
      match: { deleted: false },
      select: 'name imageUrl description price code quantity'
    })
    .sort({ name: 1 })
    .then(categories => {
      return categories.map(category => {
        const activeProducts = filterProducts(category.productsList, "active");
        return {
          _id: category._id,
          name: category.name,
          products: activeProducts
        };
      });
    });
  } catch (error) {
    throw new Error(`Erro ao buscar categorias ativas: ${error.message}`);
  };
};


//UPDATE
const updateCategory = async function(id, updateData) {
  try {
    const category = await Category.findById(id);
    
    if (!category || category.categoryDeleted) {
      throw new Error('Categoria não encontrada');
    };

    Object.assign(category, updateData);
    
    return await category.save();
  } catch (error) {
    throw new Error(`Erro ao atualizar categoria: ${error.message}`);
  };
};


//DELETE
const deleteCategory = async function(id) {
 try {
    const category = await Category.findById(id).populate('productsList.productId');

    if (!category) {
      throw new Error('Categoria não encontrada');
    };

    const produtosVinculados = (category.productsList).filter(
      p => p.productId && !p.productId.deleted
    );

    if (produtosVinculados.length > 0) {
      throw new Error('Categoria não pode ser deletada pois possui produtos vinculados');
    };
    
    return deleted;
  } catch (error) {
    throw new Error(`Erro ao deletar categoria: ${error.message}`);
  };
};


module.exports = {
    createCategory,
    getCategoryById,
    getAllCategories,
    getActiveCategories,
    updateCategory,
    deleteCategory
};