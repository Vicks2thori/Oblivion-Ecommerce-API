//imagesController.js
const ImagesService = require('./imagesService');
const { uploadImageSchema, updateImageSchema} = require('./imagesDto');


//SAVE
async function save(req, res) {
  try {
    const { id } = req.params;
    const { error   } = uploadImageSchema.validate({"name": id});

    if (error) {
      return res.status(400).json({
        success: false,
        message: `400 - Dados inválidos: ${error.details.map(d => d.message).join(', ')}`,
      });
    };

    const result = await ImagesService.saveImage(id, req.file);
    
    res.status(200).json({
      success: true,
      message: 'Imagem salva com sucesso',
      data: result
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  };
};


//READ
async function get(req, res) {
  try {
    const { id } = req.params;
    const imagePath = await ImagesService.getImage(id);
    
    res.sendFile(imagePath);
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  };
};

//DELETE
async function remove(req, res) {
  try {
    const { id } = req.params;
    const { error } = updateImageSchema.validate({"name": id});

    if (error) {
      return res.status(400).json({
        success: false,
        message: `400 - Dados inválidos: ${error.details.map(d => d.message).join(', ')}`,
      });
    };
    
    const result = await ImagesService.deleteImage(id);
    
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  };
};


module.exports = {
    save,
    get,
    remove
};