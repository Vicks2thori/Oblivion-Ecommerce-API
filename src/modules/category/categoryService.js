//categoryService.js
const Category = require("./categoryEntity");
<<<<<<< Updated upstream
const { filterActiveProducts, addProductToCategoryWithTransfer } = require("./categoryUtills");
=======
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
    return await Category.find({deleted: false})
      .populate({
        path: 'products.productId',
        match: { deleted: false },
        select: 'name imageUrl description price code quantity status'
      })
      .sort({name: 1})
      .then(categories => {
        // Incluir TODOS os produtos (ativos e inativos)
        return categories.map(category => {
          const products = filterActiveProducts(category.products, true);
          
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
=======
    return await Category.find({deleted: false}).sort({name: 1});
>>>>>>> Stashed changes
  }catch (error) {
    throw new Error(`Erro ao buscar todas as categorias: ${error.message}`);
  }
};

<<<<<<< Updated upstream

//Active - Categorias ativas com produtos ativos (E-commerce)
// Função para buscar categorias ativas com produtos ativos (E-commerce)
=======
//Active
>>>>>>> Stashed changes
const getActiveCategories = async function() {
  try {
    return await Category.find({
      deleted: false,
      status: true 
<<<<<<< Updated upstream
    })
    .populate({
      path: 'products.productId',
      match: { status: true, deleted: false },
      select: 'name imageUrl description price code quantity'
    })
    .sort({ name: 1 })
    .then(categories => {
      // Filtrar apenas produtos ativos e não deletados
      return categories.map(category => {
        const activeProducts = filterActiveProducts(category.products, false);
        
        return {
          name: category.name,
          products: activeProducts
        };
      });
    });
=======
    }).sort({ name: 1 });
>>>>>>> Stashed changes
  }catch (error) {
    throw new Error(`Erro ao buscar categorias ativas: ${error.message}`);
  }
};

<<<<<<< Updated upstream
//Update com lógica de relacionamentos
const updateCategory = async function(id, updateData) {
  try {
    const category = await Category.findById(id);
    
    if (!category || category.deleted) {
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
    
=======
//By ID
const getCategoryById = async function(id) {
  try {
    const getById = await Category.findById(id);
    
    if (!getById || getById.deleted) { //se não encontrou ou encontrou e esta deletada
      throw new Error('Categoria não encontrada'); //cria um novo erro
    }
    
    return getById;
  } catch (error) {
    throw new Error(`Erro ao buscar categoria: ${error.message}`);
  }
};


//Update
const updateCategory = async function(id, updateData) {
  try {
    const updated = await Category.findOneAndUpdate(
      {_id: id, deleted: false }, //só atualiza se não foi deletado
      updateData, 
      {new: true, runValidators: true})
    
    if (!updated) {
      throw new Error('Categoria não encontrada'); //novo erro caso não encontre
    }
    
    return updated;
>>>>>>> Stashed changes
  } catch (error) {
    throw new Error(`Erro ao atualizar categoria: ${error.message}`);
  }
};


//Delete (soft delete)
const deleteCategory = async function(id) {
 try {
<<<<<<< Updated upstream
    // Popula o campo products.productId para garantir que está vendo os produtos vinculados
    const category = await Category.findById(id).populate('products.productId');
    if (!category) {
      throw new Error('Categoria não encontrada');
    }

    // Filtra produtos realmente existentes e não deletados
    const produtosVinculados = (category.products || []).filter(
      p => p.productId && !p.productId.deleted
    );

    if (produtosVinculados.length > 0) {
      throw new Error('Categoria não pode ser deletada pois possui produtos vinculados');
    }

=======
>>>>>>> Stashed changes
    const deleted = await Category.findOneAndUpdate(
      {_id: id, deleted: false},
      {deleted: true},
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
    getAllCategories,
    getActiveCategories,
<<<<<<< Updated upstream
=======
    getCategoryById,
>>>>>>> Stashed changes
    updateCategory,
    deleteCategory
};