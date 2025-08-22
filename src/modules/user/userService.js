//userService.js
const User = require("./userEntity");

//CRUD

//Create client
const createClient = async function(data) {
  try { 
    const user = new User(data); //cria um novo
    return await user.save(); //salva no banco
  }catch (error) {
    throw new Error(`Erro ao criar usuário: ${error.message}`);
  }
};

//Create admin
const createAdmin = async function(data) {
  try {
    const user = new User(data); //cria um novo
    return await user.save(); //salva no banco
  }catch (error) {
    throw new Error(`Erro ao criar usuário: ${error.message}`);
  }
};


//Read
//All admins
const getAllAdmins = async function() {
  try {
    return await User.find({deleted: false, type: 'admin'}).sort({name: 1});
  }catch (error) {
    throw new Error(`Erro ao buscar todos os admins: ${error.message}`);
  }
};

//By ID - admin
const getAdminById = async function(id) {
  try {
    const getById = await User.findById({_id: id, type: 'admin'}, {type: 0, password: 0});
    
    if (!getById || getById.deleted) { //se não encontrou ou encontrou e esta deletada
      throw new Error('Admin não encontrado'); //cria um novo erro
    }
    
    return getById;
  } catch (error) {
    throw new Error(`Erro ao buscar admin: ${error.message}`);
  }
};

//By ID - client
const getClientById = async function(id) {
    try {
      const getById = await User.findById({_id: id, type: 'client'}, {type: 0, password: 0});
      
      if (!getById || getById.deleted) { //se não encontrou ou encontrou e esta deletada
        throw new Error('Cliente não encontrado'); //cria um novo erro
      }
      
      return getById;
    } catch (error) {
      throw new Error(`Erro ao buscar cliente: ${error.message}`);
    }
  };

//Update - admin
const updateAdmin = async function(id, updateData) {
    try {
      updateData.type = 'admin';
      const updated = await User.findOneAndUpdate(
        {_id: id, deleted: false, type: 'admin' }, //só atualiza se não foi deletado
        updateData, 
        {new: true, runValidators: true})
      
      if (!updated) {
        throw new Error('Admin não encontrado'); //novo erro caso não encontre
      }
      
      return updated;
    } catch (error) {
      throw new Error(`Erro ao atualizar admin: ${error.message}`);
    }
  };

//Update - client
const updateClient = async function(id, updateData) {
    try {
      updateData.type = 'client';
      const updated = await User.findOneAndUpdate(
        {_id: id, deleted: false, type: 'client' }, //só atualiza se não foi deletado
        updateData, 
        {new: true, runValidators: true})
      
      if (!updated) {
        throw new Error('Cliente não encontrado'); //novo erro caso não encontre
      }
      
      return updated;
    } catch (error) {
      throw new Error(`Erro ao atualizar cliente: ${error.message}`);
    }
  };

//Delete (soft delete) - user
const deleteUser = async function(id) {
 try {
    const deleted = await User.findOneAndUpdate(
      {_id: id, deleted: false},
      {deleted: true},
      {new: true}
    );
    
    if (!deleted) {
      throw new Error('Usuário não encontrado');
    }
    
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