// imagesController.js
const ImagesService = require('./imagesService');
const { uploadImageSchema, updateImageSchema } = require('./imagesDto');

async function save(req, res) {
  try {
    const { id } = req.params;
    
    // Validação do ID usando Joi
    const { error } = uploadImageSchema.validate({ "name": id });
    if (error) {
      return res.status(400).json({
        success: false,
        message: `Dados inválidos: ${error.details.map(d => d.message).join(', ')}`
      });
    }

    if (!req.files || !req.files.image) {
      return res.status(400).json({
        success: false,
        message: 'Nenhuma imagem foi enviada. Use o campo "image" para enviar o arquivo.'
      });
    }

    const file = req.files.image;

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.mimetype)) {
      return res.status(400).json({
        success: false,
        message: 'Apenas imagens JPG e PNG são permitidas'
      });
    }

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return res.status(400).json({
        success: false,
        message: `Arquivo muito grande. Máximo: 10MB. Tamanho enviado: ${(file.size / 1024 / 1024).toFixed(2)}MB`
      });
    }

    console.log('📤 Recebendo upload:', {
      id,
      filename: file.name,
      size: `${(file.size / 1024).toFixed(2)}KB`,
      mimetype: file.mimetype
    });

    const result = await ImagesService.saveImage(id, file);
    
    return res.status(200).json({
      success: true,
      message: 'Imagem salva com sucesso',
      data: result
    });
    
  } catch (error) {
    console.error('❌ Erro no controller ao salvar imagem:', error);
    
    let statusCode = 500;
    if (error.message.includes('não encontrad')) {
      statusCode = 404;
    } else if (error.message.includes('inválid') || error.message.includes('formato')) {
      statusCode = 400;
    }
    
    return res.status(statusCode).json({
      success: false,
      message: error.message,
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}

async function get(req, res) {
  try {
    const { id } = req.params;
    console.log('🔍 Buscando imagem:', id);

    const imageUrl = await ImagesService.getImage(id);
    
    return res.status(200).json({
      success: true,
      data: {
        id,
        url: imageUrl
      }
    });
    
  } catch (error) {
    console.error('❌ Erro no controller ao buscar imagem:', error);
    
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
}

async function remove(req, res) {
  try {
    const { id } = req.params;

    const { error } = updateImageSchema.validate({ "name": id });
    if (error) {
      return res.status(400).json({
        success: false,
        message: `Dados inválidos: ${error.details.map(d => d.message).join(', ')}`
      });
    }

    console.log('🗑️ Deletando imagem:', id);
    
    const result = await ImagesService.deleteImage(id);
    
    return res.status(200).json({
      success: true,
      message: 'Imagem removida com sucesso',
      data: result
    });
    
  } catch (error) {
    console.error('❌ Erro no controller ao deletar imagem:', error);
    
    const statusCode = error.message.includes('não encontrad') ? 404 : 500;
    
    return res.status(statusCode).json({
      success: false,
      message: error.message
    });
  }
}


module.exports = {
  save,
  get,
  remove
};