// cloudinary.js
const cloudinary = require('cloudinary').v2;

const configureCloudinary = () => {
  // Validação das variáveis de ambiente obrigatórias
  const requiredEnvVars = [
    'CLOUDINARY_CLOUD_NAME',
    'CLOUDINARY_API_KEY', 
    'CLOUDINARY_API_SECRET'
  ];

  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    throw new Error(
      `Variáveis de ambiente obrigatórias não configuradas: ${missingVars.join(', ')}`
    );
  }

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
  });

  console.log('✅ Cloudinary configurado com sucesso!');
  console.log(`📦 Cloud Name: ${process.env.CLOUDINARY_CLOUD_NAME}`);
};

const testCloudinaryConnection = async () => {
  try {
    const result = await cloudinary.api.ping();
    console.log('✅ Conexão com Cloudinary OK:', result);
    return true;
  } catch (error) {
    console.error('❌ Erro ao conectar com Cloudinary:', error.message);
    return false;
  }
};

const getUploadOptions = (id) => ({
  public_id: id,
  folder: 'empresas',
  overwrite: true,
  resource_type: 'image',
  allowed_formats: ['jpg', 'png', 'jpeg'],
  transformation: [
    {
      width: 1000,
      height: 1000,
      crop: 'limit'
    },
    {
      quality: 'auto:good'
    }
  ]
});

module.exports = {
  cloudinary,
  configureCloudinary,
  testCloudinaryConnection,
  getUploadOptions
};