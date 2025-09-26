//siteService.js
const Site = require("./siteEntity");

const defaultSiteConfig = {
  primaryColor: '000000',
  secondColor: '123456',
  textColor: 'FFFFFF'
};


//CREATE
const initializeSite = async function() {
  try {
    const existingSite = await Site.findOne({});

    if (existingSite) {
      console.log('✅ Site já inicializado');
      return existingSite;
    };
    
    const site = new Site(defaultSiteConfig);
    const savedSite = await site.save();
    
    console.log('🎨 Site inicializado com configuração padrão');

    return savedSite;
  } catch (error) {
    if (error.code === 11000) {
      console.log('✅ Site já existe, retornando existente');
      return await Site.findOne({});
    };
    throw new Error(`Erro ao inicializar site: ${error.message}`);
  };
};


//READ
const getSite = async function() {
  try {
    const site = await Site.findOne({});
    
    if (!site) {
      site = await initializeSite();
    }
    
    return site;
  } catch (error) {
    throw new Error(`Erro ao obter configuração do site: ${error.message}`);
  };
};


// UPDATE
const updateSite = async function(updateData) {
  try {
    const site = await Site.findOne({});
    
    if (!site) {
      site = await initializeSite();
    };
    
    const updated = await Site.findOneAndUpdate(
      { _id: site._id },
      updateData,
      { new: true, runValidators: true }
    );
    
    return updated;
  } catch (error) {
    throw new Error(`Erro ao atualizar configuração do site: ${error.message}`);
  };
};


module.exports = {
  initializeSite,
  getSite,
  updateSite
};