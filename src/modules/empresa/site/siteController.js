//siteController.js
const siteService = require('./siteService');
const { updateSiteSchema } = require('./siteDto');

//CRUD (apenas Read e Update)

//Read
const getSite = async function(req, res) {
  try {
    const site = await siteService.getSite();
    
    res.status(200).json({
      success: true,
      data: site,
      message: 'Configuração do site obtida com sucesso'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

//Update
const updateSite = async function(req, res) {
  try {
    // Validar dados de entrada
    const { error, value } = updateSiteSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Dados inválidos',
        errors: error.details.map(detail => detail.message)
      });
    }
    
    const updatedSite = await siteService.updateSite(value);
    
    res.status(200).json({
      success: true,
      data: updatedSite,
      message: 'Configuração do site atualizada com sucesso'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getSite,
  updateSite
};
