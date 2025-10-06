//imageUtils.js
const Image = require('./imageEntity');

const hasImage = async function(entityId) {
  try {
    const image = await Image.findOne({ name: entityId });
    return !!image;
  } catch (error) {
    return false;
  }
};

module.exports = { hasImage };