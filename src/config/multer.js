//multer.js
const multer = require('multer');
const path = require('path');

const TEMP_PATH = process.env.TEMP_PATH || 'src/assets/images/temp';
const MAX_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, TEMP_PATH);
  },
  
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 9);
    const ext = path.extname(file.originalname);
    cb(null, `temp_${timestamp}_${random}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (ALLOWED_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Apenas imagens JPG e PNG são permitidas'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: MAX_SIZE }
});

const uploadImage = (fieldName = 'image') => upload.single(fieldName);

const handleError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'Arquivo muito grande. Máximo: 10MB'
      });
    }
  }
  
  if (err) {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }
  
  next();
};

const requireFile = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'Nenhuma imagem foi enviada'
    });
  }
  next();
};

const cleanupTemp = async (req) => {
  if (req.file) {
    try {
      const fs = require('fs').promises;
      await fs.unlink(req.file.path);
    } catch (error) {
      console.error('Erro ao remover arquivo temporário:', error.message);
    }
  }
};

module.exports = {
  uploadImage,
  handleError,
  requireFile,
  cleanupTemp
};