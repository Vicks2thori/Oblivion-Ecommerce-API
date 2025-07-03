//stock_categoryEntiry.js
const mongoose = require('mongoose');

const StockCategorySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Nome é obrigatório'], //required + mensagem personalizada
    trim: true,  //Remove espaços inicio/fim
    minlength: [3, 'Nome deve ter um minímo de 3 caracteres'],
    maxlength: [50, 'Nome deve ter um máximo de 50 caracteres']
  },
  status: { 
    type: Boolean,
    required: true,
    default: true 
  },
  deleted: {
    type: Boolean,
    required: true,
    default: false
  }
}, { timestamps: true });

//CRUD

//Create
StockCategorySchema.statics.createStockCategory = async function(data) {
  const stockCategory = new this(data);
  return await stockCategory.save();
};


//Read
//All
StockCategorySchema.statics.getAllStockCategory = async function() {
  return await this.find({ delete: false }).sort({ name: 1 });
};

//by ID
StockCategorySchema.statics.getStockCategoryById = async function(id) {
  const stockCategory = await this.findById({
    id: id,
    deleted: false //não retornar itens deletados
  });
  if (!stockCategory) {
    throw new Error('Categoria de estoque não encontrada');
  }
  return stockCategory;
};


//Update
StockCategorySchema.statics.updateStockCategory = async function(id, validatedData) {
  try {
    const updated = await this.findOneAndUpdate(
      { 
        _id: id, 
        isDeleted: false  //só atualiza se não foi deletado
      },
      validatedData, 
      { 
        new: true, 
        runValidators: true 
      }
    );
    
    if (!updated) {
      throw new Error('Categoria de estoque não encontrada');
    }
    
    return updated;
  } catch (error) {
    throw new Error(`Erro ao atualizar categoria de estoque: ${error.message}`);
  }
};


//Delete (soft delete)
StockCategorySchema.statics.deleteStockCategory = async function(id) {
  const deleted = await this.findByIdAndUpdate({
    id: id,
    deleted: false
    }, 
    { deleted: true }, 
    { new: true }
  );
  
  if (!deleted) {
    throw new Error('Categoria de estoque não encontrada');
  }
  
  return deleted;
};

module.exports = mongoose.model('StockCategory', StockCategorySchema);