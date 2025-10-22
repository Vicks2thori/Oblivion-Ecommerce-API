const express = require('express');
const loginController = require('./loginController');
const auth = require('../../middlewares/auth');

const router = express.Router();

// POST /login - Login (público)
router.post('/', loginController.login);

// POST /logout - Logout (requer autenticação)
router.post('/logout', auth, loginController.logout);

// GET /me - Dados do usuário (requer autenticação)
router.get('/me', auth, loginController.me);

module.exports = router;