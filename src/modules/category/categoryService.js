//categoryService.js
const Category = require("./categoryEntity");
const { filterActiveProducts, addProductToCategoryWithTransfer } = require("./categoryUtils");

//CRUD

//Create
const createCategory = async function(data) {
  try { 
    const category = new Category(data); //cria um novo
    return await category.save(); //salva no banco
  }catch (error) {
    throw new Error(`Erro ao criar categoria: ${error.message}`);
  }
};


//Read
//All
const getAllCategories = async function() {
  try {
    return await Category.find({categoryDeleted: false})
      .populate({
        path: 'productsList.productId',
        match: { deleted: false },
        select: 'name imageUrl description price code quantity status'
      })
      .sort({name: 1})
      .then(categories => {
        // Incluir TODOS os produtos (ativos e inativos)
        return categories.map(category => {
          const products = filterActiveProducts(category.productsList, true);
          
          return {
            _id: category._id,
            name: category.name,
            status: category.status,
            products: products,
            createdAt: category.createdAt,
            updatedAt: category.updatedAt
          };
        });
      });
  }catch (error) {
    throw new Error(`Erro ao buscar todas as categorias: ${error.message}`);
  }
};

//Get by Id
const getCategoryById = async function(id) {
  try {
    const category = await Category.findById(id);
    if (!category) {
      throw new Error('Categoria não encontrada');
    }
    return category;
  }catch (error) {
    throw new Error(`Erro ao buscar categoria por ID: ${error.message}`);
  }
};

//Active - Categorias ativas com produtos ativos (E-commerce)
// Função para buscar categorias ativas com produtos ativos (E-commerce)
const getActiveCategories = async function() {
  try {
    return await Category.find({
      categoryDeleted: false,
      status: true 
    })
    .populate({
      path: 'productsList.productId',
      select: 'name imageUrl description price code quantity status deleted'
    })
    .sort({ name: 1 })
    .then(categories => {
      // Filtrar apenas produtos ativos e não deletados
      return categories.map(category => {
        const activeProducts = filterActiveProducts(category.productsList, false);
        
        return {
          _id: category._id,
          name: category.name,
          status: category.status,
          products: activeProducts,
          createdAt: category.createdAt,
          updatedAt: category.updatedAt
        };
      });
    });
  }catch (error) {
    throw new Error(`Erro ao buscar categorias ativas: ${error.message}`);
  }
};

//Update com lógica de relacionamentos
const updateCategory = async function(id, updateData) {
  try {
    const category = await Category.findById(id);
    
    if (!category || category.categoryDeleted) {
      throw new Error('Categoria não encontrada');
    }

    // Processar produtos se existirem
    if (updateData.products && Array.isArray(updateData.products)) {
      // Adicionar cada produto com verificação de transferência
      for (const product of updateData.products) {
        await addProductToCategoryWithTransfer(category._id, product.productId);
      }
      
      // Remover products do updateData para não sobrescrever
      delete updateData.products;
    }

    // Atualizar outros campos
    Object.assign(category, updateData);
    
    return await category.save();
    
  } catch (error) {
    throw new Error(`Erro ao atualizar categoria: ${error.message}`);
  }
};


//Delete (soft delete)
const deleteCategory = async function(id) {
 try {
    // Popula o campo productsList.productId para garantir que está vendo os produtos vinculados
    const category = await Category.findById(id).populate('productsList.productId');
    if (!category) {
      throw new Error('Categoria não encontrada');
    }

    // Filtra produtos realmente existentes e não deletados
    const produtosVinculados = (category.productsList || []).filter(
      p => p.productId && !p.productId.deleted
    );

    if (produtosVinculados.length > 0) {
      throw new Error('Categoria não pode ser deletada pois possui produtos vinculados');
    }

    const deleted = await Category.findOneAndUpdate(
      {_id: id, categoryDeleted: false},
      {categoryDeleted: true},
      {new: true}
    );
    
    if (!deleted) {
      throw new Error('Categoria não encontrada');
    }
    
    return deleted;
  } catch (error) {
    throw new Error(`Erro ao deletar categoria: ${error.message}`);
  }
};

module.exports = {
    createCategory,
    getCategoryById,
    getAllCategories,
    getActiveCategories,
    updateCategory,
    deleteCategory
};