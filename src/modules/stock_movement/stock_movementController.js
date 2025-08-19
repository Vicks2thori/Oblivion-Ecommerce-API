//stock_movementController.js
const stockMovementService = require('./stock_movementService');
const { createStockMovementSchema } = require('./stock_movementDto');

//CRUD (apenas Create e Read)

//Create
const create = async function(req, res) {
  try {
    const stockMovement = await stockMovementService.createStockMovementSchema(req.body);
    
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
  }
};

//Read
//Get All
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
  }
};

//Get By Id
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
    }
  };

module.exports = {
  create,
  getAll,
  getById
};