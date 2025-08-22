//userController.js
const { createUserSchema, updateUserSchema } = require('./userDto');
const User = require('./userService');
//const { badRequest400, responseHelpersOk, responseHelpersError } = require("../../../routes/responseHelpers"); futuramente qando estiver funcionando

//CRUD

//Create
async function create(req, res) {
  try {
    //Validar DTO
    const { error, value } = createUserSchema.validate(req.body); //validate do Joi retorna um erro(null se estiver ok) e os valores
    if (error) {
      //400 - Dados inválidos
      return res.status(400).json({
        success: false,
        message: '400 - Dados inválidos',
        errors: error.details.map(d => d.message) //extrai só as mensagens
      });
    };

    //Criar através do Service
    const user = await User.createUser(value);

    //200 - Sucesso geral
    res.status(200).json({
      success: true,
      message: '200 - Operação realizada com sucesso',
      data: user
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
async function getAllAdmins(req, res) {
  try {
    const admins = await User.getAllAdmins();

    //OK
    //200 - Sucesso geral
    res.status(200).json({
      success: true,
      message: '200 - Operação realizada com sucesso',
      data: admins
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
async function getAdminById(req, res) {
  try {
    const { id } = req.params;
    const admin = await User.getAdminById(id);

    //200 - Sucesso geral
    res.status(200).json({
      success: true,
      message: '200 - Operação realizada com sucesso',
      data: admin
    });

  }catch (error) {
    //500 - Erro interno do servidor
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

//By ID
async function getClientById(req, res) {
  try {
    const { id } = req.params;
    const client = await User.getClientById(id);

    //200 - Sucesso geral
    res.status(200).json({
      success: true,
      message: '200 - Operação realizada com sucesso',
      data: client
    });

  }catch (error) {
    //500 - Erro interno do servidor
    return res.status(500).json({
      success: false,
      message: error.message 
    });
  };
};


//Update
async function update(req, res) {
  try {
    const { id } = req.params;

    const { error, value } = updateUserSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        errors: error.details.map(d => d.message) // ✅ Só aqui usar .details
      });
    }
    
    const result = await User.updateAdmin(id, value);
    
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
async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const deleted = await User.deleteUser(id);

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
  getAllAdmins,
  getAdminById,
  getClientById,
  update,
  deleteUser
};