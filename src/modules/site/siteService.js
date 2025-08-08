//siteService.js
const Site = require("./siteEntity");

// Configuração padrão para o Site
const defaultSiteConfig = {
  primaryColor: '000000',
  secondColor: '123456', 
  textColor: 'FFFFFF'
};

// CREATE - Função única para inicialização automática
const initializeSite = async function() {
  try {
    // Verifica se já existe
    const existingSite = await Site.findOne({});
    if (existingSite) {
      console.log('✅ Site já inicializado');
      return existingSite;
    }
    
    // Cria o site padrão
    const site = new Site(defaultSiteConfig);
    const savedSite = await site.save();
    
    console.log('🎨 Site inicializado com configuração padrão');
    return savedSite;
  } catch (error) {
    // Se erro for de duplicação, apenas retorna o existente
    if (error.code === 11000) {
      console.log('✅ Site já existe, retornando existente');
      return await Site.findOne({});
    }
    throw new Error(`Erro ao inicializar site: ${error.message}`);
  }
};

// READ - Função 1: Obter Site (uso geral)
const getSite = async function() {
  try {
    let site = await Site.findOne({});
    
    // Se não existir, cria automaticamente
    if (!site) {
      site = await initializeSite();
    }
    
    return site;
  } catch (error) {
    throw new Error(`Erro ao obter configuração do site: ${error.message}`);
  }
};

// UPDATE - Função única para atualização
const updateSite = async function(updateData) {
  try {
    let site = await Site.findOne({});
    
    // Se não existir, cria primeiro
    if (!site) {
      site = await initializeSite();
    }
    
    // Atualiza os dados
    const updated = await Site.findOneAndUpdate(
      { _id: site._id },
      updateData,
      { new: true, runValidators: true }
    );
    
    return updated;
  } catch (error) {
    throw new Error(`Erro ao atualizar configuração do site: ${error.message}`);
  }
};

module.exports = {
  initializeSite,
  getSite,
  updateSite
};