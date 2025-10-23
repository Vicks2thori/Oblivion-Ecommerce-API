// imagesService.js
const Image = require('./imagesEntity');
const { cloudinary, getUploadOptions } = require('../../config/cloudinary');

const saveImage = async function(id, file) {
  try {
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        getUploadOptions(id),
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(file.data);
    });
    
    const imageDoc = await Image.findOneAndUpdate(
      { name: id },
      { 
        name: id,
        url: result.secure_url,
        publicId: result.public_id
      },
      { upsert: true, new: true }
    );
    
    console.log('✅ Imagem salva com sucesso:', {
      id,
      url: result.secure_url,
      size: result.bytes,
      format: result.format
    });
    
    return {
      id,
      imageUrl: result.secure_url,
      publicId: result.public_id,
      format: result.format,
      size: result.bytes
    };
    
  } catch (error) {
    console.error('❌ Erro ao salvar imagem:', error);
    throw new Error(`Erro ao salvar imagem: ${error.message}`);
  }
};

const getImage = async function(id) {
  try {
    const image = await Image.findOne({ name: id });
    
    if (!image) {
      throw new Error('Imagem não encontrada no banco de dados');
    }
    
    console.log('✅ Imagem encontrada:', id);
    
    return image.url;
    
  } catch (error) {
    console.error('❌ Erro ao buscar imagem:', error);
    throw new Error(`Erro ao buscar imagem: ${error.message}`);
  }
};

const deleteImage = async function(id) {
  try {
    const image = await Image.findOne({ name: id });
    
    if (!image) {
      throw new Error('Imagem não encontrada no banco de dados');
    }

    if (image.publicId) {
      try {
        await cloudinary.uploader.destroy(image.publicId);
        console.log('✅ Imagem deletada do Cloudinary:', image.publicId);
      } catch (cloudError) {
        console.error('⚠️ Erro ao deletar do Cloudinary:', cloudError.message);
      }
    }

    await Image.deleteOne({ name: id });
    console.log('✅ Registro deletado do banco:', id);
    
    return { 
      success: true,
      message: 'Imagem removida com sucesso' 
    };
    
  } catch (error) {
    console.error('❌ Erro ao deletar imagem:', error);
    throw new Error(`Erro ao deletar imagem: ${error.message}`);
  }
};

const imageExists = async function(id) {
  try {
    const image = await Image.findOne({ name: id });
    return !!image;
  } catch (error) {
    console.error('❌ Erro ao verificar existência:', error);
    return false;
  }
};


module.exports = {
  saveImage,
  getImage,
  deleteImage,
  imageExists
};