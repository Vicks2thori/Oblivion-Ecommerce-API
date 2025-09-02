//userUtills.js
const User = require("./userEntity");
const bcrypt = require("bcrypt");

const convertPasswordToHash = async function(password) {
  try {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  } catch (error) {
    throw new Error(`Erro ao converter senha para hash: ${error.message}`);
  };
};

module.exports = {
    convertPasswordToHash
};