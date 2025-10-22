// loginController.js
const { loginSchema } = require('./loginDto');
const LoginService = require('./loginService');

/**
 * Realiza o login do usuário
 * Valida credenciais, gera token JWT e cria sessão
 */
const login = async (req, res) => {
  try {
    const { error, value } = loginSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Dados inválidos',
        errors: error.details.map(d => d.message)
      });
    }

    const ip = req.ip || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];

    const result = await LoginService.login(
      value.email,
      value.password,
      ip,
      userAgent
    );

    return res.status(200).json({
      success: true,
      message: 'Login realizado com sucesso',
      data: result
    });

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Encerra a sessão atual do usuário
 * Invalida o token JWT específico
 */
const logout = async (req, res) => {
  try {
    // CORREÇÃO: O token já vem decodificado pelo middleware auth em req.user
    // Mas precisamos do token RAW para invalidar na sessão
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(400).json({
        success: false,
        message: 'Token não fornecido'
      });
    }

    const token = authHeader.split(' ')[1];
    const result = await LoginService.logout(token);

    return res.status(200).json({
      success: true,
      message: result.message
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Retorna os dados do usuário autenticado
 * Usa os dados já decodificados pelo middleware auth
 */
const me = async (req, res) => {
  try {
    // Os dados do usuário já vêm decodificados do middleware auth em req.user
    const user = req.user;
    
    return res.status(200).json({
      success: true,
      message: 'Dados do usuário obtidos com sucesso',
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        enterprise_id: user.enterprise_id
      }
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  login,
  logout,
  me
};