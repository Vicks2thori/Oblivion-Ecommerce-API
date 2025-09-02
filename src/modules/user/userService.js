//userService.js
const User = require("./userEntity");


//CREATE
const createClient = async function(data) {
  try { 
    const user = new User(data); 

    return await user.save();
  } catch (error) {
    throw new Error(`Erro ao criar usuário: ${error.message}`);
  };
};

const createAdmin = async function(data) {
  try { 
    const user = new User(data);

    return await user.save();
  } catch (error) {
    throw new Error(`Erro ao criar usuário: ${error.message}`);
  };
};


//READ
const getAllAdmins = async function() {
  try {
    return await User.find({deleted: false, type: 'admin'}).sort({name: 1});
  } catch (error) {
    throw new Error(`Erro ao buscar todos os admins: ${error.message}`);
  };
};

const getAdminById = async function(id) {
  try {
    const getById = await User.findById({_id: id, type: 'admin'}, {type: 0, password: 0});
    
    if (!getById || getById.deleted) {
      throw new Error('Admin não encontrado');
    };
    
    return getById;
  } catch (error) {
    throw new Error(`Erro ao buscar admin: ${error.message}`);
  }
};

const getClientById = async function(id) {
  try {
    const getById = await User.findById({_id: id, type: 'client'}, {type: 0, password: 0});

    if (!getById || getById.deleted) {
      throw new Error('Cliente não encontrado');
    };
      
    return getById;
  } catch (error) {
    throw new Error(`Erro ao buscar cliente: ${error.message}`);
    };
  };

//UPDATE
const updateAdmin = async function(id, updateData) {
  try {
    const updated = await User.findOneAndUpdate(
      {_id: id, deleted: false, type: 'admin' },
      updateData, 
      {new: true, runValidators: true});
  
    if (!updated) {
      throw new Error('Admin não encontrado');
    };
    
    return updated;
  } catch (error) {
    throw new Error(`Erro ao atualizar admin: ${error.message}`);
  };
};

//UPDATE
const updateClient = async function(id, updateData) {
  try {
    const updated = await User.findOneAndUpdate(
      {_id: id, deleted: false, type: 'client' },
      updateData, 
      {new: true, runValidators: true});
    
    if (!updated) {
      throw new Error('Cliente não encontrado');
    };
    
    return updated;
  } catch (error) {
    throw new Error(`Erro ao atualizar cliente: ${error.message}`);
  };
};

//DELETE
const deleteUser = async function(id) {
 try {
    const deleted = await User.findOneAndUpdate(
      {_id: id, deleted: false},
      {deleted: true},
      {new: true}
    );
    
    if (!deleted) {
      throw new Error('Usuário não encontrado');
    };
    
    return deleted;
  } catch (error) {
    throw new Error(`Erro ao deletar usuário: ${error.message}`);
  }
};

module.exports = {
    createClient,
    createAdmin,
    getAllAdmins,
    getAdminById,
    getClientById,
    updateAdmin,
    updateClient,
    deleteUser
};