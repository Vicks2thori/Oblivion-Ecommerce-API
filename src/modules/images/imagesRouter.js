// imagesRouter.js
const express = require('express');
const { uploadImage, handleError, requireFile } = require('../../config/multer');
const imagesController = require('./imagesController');

const router = express.Router();

//SAVE -post -put
router.post('/:id', uploadImage(), handleError, requireFile, imagesController.save);
router.put('/:id', uploadImage(), handleError, requireFile, imagesController.save);

//READ -get
router.get('/:id', imagesController.get);

//DELETE -delete
router.delete('/:id', imagesController.remove);

module.exports = router;