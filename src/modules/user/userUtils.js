//userUtils.js
const bcrypt = require("bcrypt");
const crypto = require('crypto');
const User = require("./userEntity");

const convertPasswordToHash = async function(password) {
  try {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  } catch (error) {
    throw new Error(`Erro ao converter senha para hash: ${error.message}`);
  };
};

const comparePasswordHash = async (password, hash) => {
  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    throw new Error(`Erro ao verificar senha: ${error.message}`);
  };
};

const convertDataToSearchableHash = function(data) {
  try {
    return crypto.createHash('sha256').update(data).digest('hex');
  } catch (error) {
    throw new Error(`Erro ao converter dados para hash: ${error.message}`);
  };
};

const checkIfEmailExist = async function(email) {
  try {
    const emailHash = convertDataToSearchableHash(email);
    const emailExists = await User.findOne({deleted: false, email: emailHash});

    if (!emailExists) {
      return false;
    };

    return true;
  } catch (error) {
    throw new Error(`Erro ao verificar email: ${error.message}`);
  };
};

const checkIfCpfExist = async function(cpf) {
  try {
    const cpfHash = convertDataToSearchableHash(cpf);
    const cpfExists = await User.findOne({deleted: false, 'clientDetails.cpf': cpfHash});
    
    if (!cpfExists) {
      return false;
    };

    return true;
  } catch (error) {
    throw new Error(`Erro ao verificar CPF: ${error.message}`);
  };
};

const checkIfCellExist = async function(cell) {
  try {
    const cellExists = await User.findOne({deleted: false, 'clientDetails.cell': cell});

    if (!cellExists) {
      return false;
    };

    return true;
  } catch (error) {
    throw new Error(`Erro ao verificar telefone: ${error.message}`);
  };
};

module.exports = {
    convertPasswordToHash,
    comparePasswordHash,
    convertDataToSearchableHash,
    checkIfEmailExist,
    checkIfCpfExist,
    checkIfCellExist
};