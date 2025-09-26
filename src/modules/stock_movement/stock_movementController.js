//stock_movementController.js
const stockMovementService = require('./stock_movementService');
const { createStockMovementSchema } = require('./stock_movementDto');


//CREATE
const create = async function(req, res) {
  try {
    const { error, value } = createStockMovementSchema.validate(req.body);
    if (error) {
      //Dados inválidos
      return res.status(400).json({
        success: false,
        message: `400 - Dados inválidos: ${error.details.map(d => d.message)}`
      });
    };

    const stockMovement = await stockMovementService.createStockMovement(value);
    
    res.status(200).json({
      success: true,
      data: stockMovement,
      message: 'Movimento de estoque criado com sucesso'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  };
};


//READ
const getAll = async function(req, res) {
  try {
    const stockMovements = await stockMovementService.getAllStockMovements();
    
    res.status(200).json({
      success: true,
      data: stockMovements,
      message: 'Movimentos de estoque obtidos com sucesso'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  };
};

const getById = async function(req, res) {
    try {
      const stockMovement = await stockMovementService.getStockMovementById(req.params.id);
      
      res.status(200).json({
        success: true,
        data: stockMovement,
        message: 'Movimento de estoque obtido com sucesso'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    };
  };

module.exports = {
  create,
  getAll,
  getById
};