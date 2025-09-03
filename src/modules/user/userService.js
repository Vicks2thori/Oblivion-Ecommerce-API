//userService.js
const User = require("./userEntity");
const { convertDataToSearchableHash,
  convertPasswordToHash,
  checkIfEmailExist,
  checkIfCpfExist,
  checkIfCellExist } = require("./userUtils");


//CREATE
const createClient = async function(data) {
  try {
    const emailExist = await checkIfEmailExist(data.email);
    const cpfExist = await checkIfCpfExist(data.clientDetails.cpf);
    const cellExist = await checkIfCellExist(data.clientDetails.cell);

    if (emailExist) {
      throw new Error('Email já cadastrado');
    };

    if (cpfExist) {
      throw new Error('Cpf já cadastrado');
    };

    if (cellExist) {
      throw new Error('Celular já cadastrado');
    };

    data.email = await convertDataToSearchableHash(data.email);
    data.password = await convertPasswordToHash(data.password);
    data.clientDetails.cpf = await convertDataToSearchableHash(data.clientDetails.cpf);
    data.clientDetails.cell = await convertDataToSearchableHash(data.clientDetails.cell);

    const user = new User(data); 

    return await user.save();
  } catch (error) {
    throw new Error(`Erro ao criar usuário: ${error.message}`);
  };
};

const createAdmin = async function(data) {
  try {
    const emailExist = await checkIfEmailExist(data.email);

    if (emailExist) {
      throw new Error('Email já cadastrado');
    };

    data.email = await convertDataToSearchableHash(data.email);
    data.password = await convertPasswordToHash(data.password);

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
    if (updateData.email) {
      const emailHash = await convertDataToSearchableHash(updateData.email);
      const emailExist = await checkIfEmailExist(emailHash);

      if (emailExist) {
        throw new Error('Email já cadastrado');
      };
    };

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
    if (updateData.email) {
      const emailHash = await convertDataToSearchableHash(updateData.email);
      const emailExist = await checkIfEmailExist(emailHash);

      if (emailExist) {
        throw new Error('Email já cadastrado');
      };

      updateData.email = emailHash;
    };

    if (updateData.clientDetails && updateData.clientDetails.cpf) {
      const cpfHash = await convertDataToSearchableHash(updateData.clientDetails.cpf);
      const cpfExist = await checkIfCpfExist(cpfHash);

      if (cpfExist) {
        throw new Error('Cpf já cadastrado');
      };

      updateData.clientDetails.cpf = cpfHash;
    };

    if (updateData.clientDetails && updateData.clientDetails.cell) {
      const cellHash = await convertDataToSearchableHash(updateData.clientDetails.cell);
      const cellExist = await checkIfCellExist(cellHash);

      if (cellExist) {
        throw new Error('Celular já cadastrado');
      };
      updateData.clientDetails.cell = cellHash;
    };

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