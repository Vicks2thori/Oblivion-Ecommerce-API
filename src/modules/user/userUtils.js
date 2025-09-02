//userUtills.js
const bcrypt = require("bcrypt");

const convertPasswordToHash = async function(password) {
  try {
    const hash = await bcrypt.hash(password, 10);

    return hash;
  } catch (error) {
    throw new Error(`Erro ao converter senha para hash: ${error.message}`);
  };
};

const convertHashToPassword = async function(hash) {
  try {
    const password = await bcrypt.compare(hash, password);

    return password;
  } catch (error) {
    throw new Error(`Erro ao converter hash para senha: ${error.message}`);
  };
};

module.exports = {
    convertPasswordToHash,
    convertHashToPassword
};