//enterpriseController.js
const enterpriseService = require('./enterpriseService');
const { updateEnterpriseSchema } = require('./enterpriseDto');


//READ
const getEnterprise = async function(req, res) {
  try {
    const enterprise = await enterpriseService.getEnterprise();
    
    res.status(200).json({
      success: true,
      data: enterprise,
      message: 'Configuração da empresa obtida com sucesso'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  };
};


//UPDATE
const updateEnterprise = async function(req, res) {
  try {
    const { error, value } = updateEnterpriseSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Dados inválidos',
        errors: error.details.map(detail => detail.message)
      });
    };
    
    const updatedEnterprise = await enterpriseService.updateEnterprise(value);
    
    res.status(200).json({
      success: true,
      data: updatedEnterprise,
      message: 'Configuração da empresa atualizada com sucesso'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  };
};


module.exports = {
  getEnterprise,
  updateEnterprise
};