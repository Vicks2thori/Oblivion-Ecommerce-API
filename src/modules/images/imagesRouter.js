// imagesRouter.js
const express = require('express');
const fileUpload = require('express-fileupload');
const imagesController = require('./imagesController');

const router = express.Router();

const uploadMiddleware = fileUpload({
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  abortOnLimit: true,
  useTempFiles: false
});

router.post('/:id', uploadMiddleware, imagesController.save);
router.put('/:id', uploadMiddleware, imagesController.save);

router.get('/:id', imagesController.get);

router.delete('/:id', imagesController.remove);

module.exports = router;