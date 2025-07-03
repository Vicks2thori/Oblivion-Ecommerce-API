//categoryEntity.js
const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
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
CategorySchema.statics.createCategory = async function(data) {
  const category = new this(data);
  return await category.save();
};


//Read
//All
CategorySchema.statics.getAllCategory = async function() {
  return await this.find({ delete: false }).sort({ name: 1 });
};

//by ID
CategorySchema.statics.getCategoryById = async function(id) {
  const category = await this.findById({
    id: id,
    deleted: false //não retornar itens deletados
  });
  if (!category) {
    throw new Error('Categoria não encontrada');
  }
  return category;
};


//Update
CategorySchema.statics.updateCategory = async function(id, validatedData) {
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
      throw new Error('Categoria não encontrada');
    }
    
    return updated;
  } catch (error) {
    throw new Error(`Erro ao atualizar categoria: ${error.message}`);
  }
};


//Delete (soft delete)
CategorySchema.statics.deleteCategory = async function(id) {
  const deleted = await this.findByIdAndUpdate({
    id: id,
    deleted: false
    }, 
    { deleted: true }, 
    { new: true }
  );
  
  if (!deleted) {
    throw new Error('Categoria não encontrada');
  }
  
  return deleted;
};

module.exports = mongoose.model('Category', CategorySchema);