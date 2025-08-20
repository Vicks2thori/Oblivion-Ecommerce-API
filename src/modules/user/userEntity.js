//userEntity.js
const mongoose = require('mongoose');

// Schema do usuário
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['admin', 'client', 'employee']
  }
}, {
  timestamps: true
});

// Modelo do usuário
const User = mongoose.model('User', userSchema);

//Create
async function createUser({name, email, password, type}) {
  try {
    const user = new User({ name, email, password, type });
    const result = await user.save();
    return result._id;
  } catch (error) {
    throw error;
  }
}

//Read
async function getUserType({type}) {
  try {
    const user = await User.findOne({ type });
    return user;
  } catch (error) {
    throw error;
  }
}

//Update
async function updateUser({id, name, email, password}) {
  try {
    // Filtra apenas campos que foram enviados (não undefined/null)
    const fieldsToUpdate = {};

    if (name) fieldsToUpdate.name = name;
    if (email) fieldsToUpdate.email = email;
    if (password) fieldsToUpdate.password = password;

    if (Object.keys(fieldsToUpdate).length === 0) {
      return { success: false, message: 'Nenhum campo para atualizar' };
    }

    const result = await User.findByIdAndUpdate(
      id,
      fieldsToUpdate,
      { new: true, runValidators: true }
    );

    return {
      success: !!result,
      affectedRows: result ? 1 : 0,
      user: result
    };
  } catch (error) {
    throw error;
  }
}

module.exports = { 
  User,
  createUser, 
  getUserType, 
  updateUser 
};