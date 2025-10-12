// imagesService.js
const Image = require('./imagesEntity');
const fs = require('fs').promises;
const path = require('path');

const IMAGES_PATH = 'src/assets/images/uploads/';

const saveImage = async function(id, file) {
  try {
    await fs.mkdir(IMAGES_PATH, { recursive: true });
    
    try {
      await fs.unlink(path.join(IMAGES_PATH, `${productId}.jpg`));
    } catch (e) {};

    try {
      await fs.unlink(path.join(IMAGES_PATH, `${id}.png`));
    } catch (e) {};
    
    const ext = file.mimetype === 'image/png' ? '.png' : '.jpg';
    const finalPath = path.join(IMAGES_PATH, `${id}${ext}`);
     
    await fs.rename(file.path, finalPath);
    
    await Image.findOneAndUpdate(
      { name: id },
      { name: id },
      { upsert: true, new: true }
    );
    
    return {
      id,
      imageUrl: `/api/images/${id}`
    };
    
  } catch (error) {
    try {
      await fs.unlink(file.path);
    } catch (e) {};
    
    throw new Error(`Erro ao salvar imagem: ${error.message}`);
  };
};

const getImage = async function(id) {
  try {
    const image = await Image.findOne({ name: id });
    if (!image) {
      throw new Error('Imagem não encontrada');
    };
    
    const jpgPath = path.join(IMAGES_PATH, `${id}.jpg`);
    const pngPath = path.join(IMAGES_PATH, `${id}.png`);
    
    try {
      await fs.access(jpgPath);
      return path.resolve(jpgPath);
    } catch (e) {
      await fs.access(pngPath);
      return path.resolve(pngPath);
    };
  } catch (error) {
    throw new Error(`Erro ao buscar imagem: ${error.message}`);
  };
};

const deleteImage = async function(id) {
  try {
    try {
      await fs.unlink(path.join(IMAGES_PATH, `${id}.jpg`));
    } catch (e) {};

    try {
      await fs.unlink(path.join(IMAGES_PATH, `${id}.png`));
    } catch (e) {};
    
    await Image.deleteOne({ name: id });
    
    return { message: 'Imagem removida' };
  } catch (error) {
    throw new Error(`Erro ao deletar imagem: ${error.message}`);
  };
};

module.exports = {
  saveImage,
  getImage,
  deleteImage
};