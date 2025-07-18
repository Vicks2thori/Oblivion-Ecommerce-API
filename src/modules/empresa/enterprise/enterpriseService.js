//enterpriseService.js
const Enterprise = require("./enterpriseEntity");

// Configuração padrão para a empresa
const defaultEnterpriseConfig = {
  name: 'Oblivion',
  logoUrl: 'https://www.oblivion.com.br/logo.png', 
  phone: '10987654321',
  instagram: 'www.instagram.com/oblivion',
  facebook: 'https://www.facebook.com/oblivion',
  email: 'oblivion@gmail.com'
};

// CREATE - Função única para inicialização automática
const initializeEnterprise = async function() {
  try {
    // Verifica se já existe
    const existingEnterprise = await Enterprise.findOne({});
    if (existingEnterprise) {
      console.log('✅ Enterprise já inicializado');
      return existingEnterprise;
    }
    
    // Cria a empresa padrão
    const enterprise = new Enterprise(defaultEnterpriseConfig);
    const savedEnterprise = await enterprise.save();
    
    console.log('🎨 Enterprise inicializado com configuração padrão');
    return savedEnterprise;
  } catch (error) {
    // Se erro for de duplicação, apenas retorna o existente
    if (error.code === 11000) {
      console.log('✅ Enterprise já existe, retornando existente');
      return await Enterprise.findOne({});
    }
    throw new Error(`Erro ao inicializar enterprise: ${error.message}`);
  }
};

// READ - Obter Enterprise (uso geral)
const getEnterprise = async function() {
  try {
    let enterprise = await Enterprise.findOne({});
    
    // Se não existir, cria automaticamente
    if (!enterprise) {
        enterprise = await initializeEnterprise();
    }
    
    return enterprise;
  } catch (error) {
    throw new Error(`Erro ao obter configuração da enterprise: ${error.message}`);
  }
};

// UPDATE - Função única para atualização
const updateEnterprise = async function(updateData) {
  try {
    let enterprise = await Enterprise.findOne({});
    
    // Se não existir, cria primeiro
    if (!enterprise) {
      enterprise = await initializeEnterprise();
    }
    
    // Atualiza os dados
    const updated = await Enterprise.findOneAndUpdate(
      { _id: enterprise._id },
      updateData,
      { new: true, runValidators: true }
    );
    
    return updated;
  } catch (error) {
    throw new Error(`Erro ao atualizar enterprise: ${error.message}`);
  }
};

module.exports = {
  initializeEnterprise,
  getEnterprise,
  updateEnterprise
};