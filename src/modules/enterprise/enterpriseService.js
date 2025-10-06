//enterpriseService.js
const Enterprise = require("./enterpriseEntity");

const defaultEnterpriseConfig = {
  nameEnterprise: 'Oblivion',
  logoUrl: 'https://www.oblivion.com.br/logo.png',
  cell: '10987654321',
  nameInstagram: 'oblivion',
  nameFacebook: 'oblivion',
  email: 'oblivion@gmail.com'
};

//CREATE
const initializeEnterprise = async function() {
  try {
    const existingEnterprise = await Enterprise.findOne({});

    if (existingEnterprise) {
      console.log('✅ Enterprise já inicializado');

      return existingEnterprise;
    };
    
    const enterprise = new Enterprise(defaultEnterpriseConfig);
    const savedEnterprise = await enterprise.save();
    
    console.log('🎨 Enterprise inicializado com configuração padrão');

    return savedEnterprise;
  } catch (error) {
    if (error.code === 11000) {
      console.log('✅ Enterprise já existe, retornando existente');
      return await Enterprise.findOne({});
    };

    throw new Error(`Erro ao inicializar enterprise: ${error.message}`);
  };
};


//READ
const getEnterprise = async function() {
  try {
    const enterprise = await Enterprise.findOne({});
    
    if (!enterprise) {
        enterprise = await initializeEnterprise();
    };
    
    return enterprise;
  } catch (error) {
    throw new Error(`Erro ao obter configuração da enterprise: ${error.message}`);
  };
};


//UPDATE
const updateEnterprise = async function(updateData) {
  try {
    const enterprise = await Enterprise.findOne({});
    
    if (!enterprise) {
      enterprise = await initializeEnterprise();
    };
    
    const updated = await Enterprise.findOneAndUpdate(
      { _id: enterprise._id },
      updateData,
      { new: true, runValidators: true }
    );
    
    return updated;
  } catch (error) {
    throw new Error(`Erro ao atualizar enterprise: ${error.message}`);
  };
};


module.exports = {
  initializeEnterprise,
  getEnterprise,
  updateEnterprise
};