//userController.js
const { createAdminSchema,
   createClientSchema,
   updateAdminSchema,
   updateClientSchema } = require('./userDto');
const User = require('./userService');


//CREATE
async function createAdmin(req, res) {
  try {
    req.body.type = 'admin';

    if (!req.body.adminDetails) {
      req.body.adminDetails = { status: true };
    };
    
    const { error, value } = createAdminSchema.validate(req.body);

    if (error) {
      //Dados inválidos
      return res.status(400).json({
        success: false,
        message: '400 - Dados inválidos',
        errors: error.details.map(d => d.message)
      });
    };

    const user = await User.createAdmin(value);

    //Sucesso
    res.status(200).json({
      success: true,
      message: '200 - Operação realizada com sucesso',
      data: user
    });
  }catch (error) {
    //Erro interno do servidor
    return res.status(500).json({
      success: false,
      message: error.message
    });
  };
};

async function createClient(req, res) {
  try {
    req.body.type = 'client';
    
    const { error, value } = createClientSchema.validate(req.body);

    if (error) {
      //Dados inválidos
      return res.status(400).json({
        success: false,
        message: `400 - Dados inválidos ${error.details.map(d => d.message)}`
      });
    };

    const user = await User.createClient(value);

    //Sucesso
    res.status(200).json({
      success: true,
      message: '200 - Operação realizada com sucesso',
      data: user
    });
  }catch (error) {
    //Erro interno do servidor
    return res.status(500).json({
      success: false,
      message: error.message
    });
  };
};

//READ
async function getAllAdmins(req, res) {
  try {
    const admins = await User.getAllAdmins();

    //Sucesso geral
    res.status(200).json({
      success: true,
      message: '200 - Operação realizada com sucesso',
      data: admins
    });
  } catch (error) {
    //Erro interno do servidor
    return res.status(500).json({
      success: false,
      message: error.message
    });
  };
};

async function getAdminById(req, res) {
  try {
    const { id } = req.params;
    const admin = await User.getAdminById(id);

    //Sucesso
    res.status(200).json({
      success: true,
      message: '200 - Operação realizada com sucesso',
      data: admin
    });
  } catch (error) {
    //Erro interno do servidor
    return res.status(500).json({
      success: false,
      message: error.message
    });
  };
};

async function getClientById(req, res) {
  try {
    const { id } = req.params;
    const client = await User.getClientById(id);

    //Sucesso geral
    res.status(200).json({
      success: true,
      message: '200 - Operação realizada com sucesso',
      data: client
    });
  } catch (error) {
    //Erro interno do servidor
    return res.status(500).json({
      success: false,
      message: error.message 
    });
  };
};


//UPDATE
async function updateAdmin(req, res) {
  try {
    const { id } = req.params; 
    req.body.type = 'admin';

    const { error, value } = updateAdminSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        errors: error.details.map(d => d.message)
      });
    };
    
    const result = await User.updateAdmin(id, value);
    
    //Sucesso
    return res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    //Erro interno do servidor
    return res.status(500).json({
      success: false,
      message: error.message
    });
  };
};

async function updateClient(req, res) {
  try {
    const { id } = req.params;
    req.body.type = 'client';

    const { error, value } = updateClientSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        errors: error.details.map(d => d.message)
      });
    };
    
    const result = await User.updateClient(id, value);
    
    //Sucesso
    return res.status(200).json({
      success: true,
      data: result
    }); 
  } catch (error) {
    //Erro interno do servidor
    return res.status(500).json({
      success: false,
      message: error.message
    });
  };
};


//DELETE
async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const deleted = await User.deleteUser(id);

    //Sucesso
    res.status(200).json({
      success: true,
      message: '200 - Operação realizada com sucesso',
      data: deleted
    });
  } catch (error) {
    //Erro interno do servidor
    return res.status(500).json({
      success: false,
      message: error.message
    });
  };
};

module.exports = {
  createAdmin,
  createClient,
  getAllAdmins,
  getAdminById,
  getClientById,
  updateAdmin,
  updateClient,
  deleteUser
};