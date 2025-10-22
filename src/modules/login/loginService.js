//loginService.js
const User = require('../user/userEntity');
const Session = require('./sessionEntity');
const { comparePasswordHash, convertDataToSearchableHash } = require('../user/userUtils');
const { generateToken } = require('./loginUtils');

const login = async (email, password, ip, userAgent) => {
  try {
    const emailHash = convertDataToSearchableHash(email);

    const user = await User.findOne({
      email: emailHash,
      deleted: false
    });

    if (!user) {
      throw new Error('Email ou senha inválidos');
    }

    const passwordMatch = await comparePasswordHash(password, user.password);

    if (!passwordMatch) {
      throw new Error('Email ou senha inválidos');
    }

    if (user.type === 'admin' && user.adminDetails && !user.adminDetails.status) {
      throw new Error('Usuário desativado');
    }

    const accessToken = generateToken(user);

    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    const session = new Session({
      token: accessToken,
      userId: user._id,
      userType: user.type,
      ip,
      userAgent,
      expiresAt,
      active: true
    });

    await session.save();

    return {
      accessToken,
      user: {
        id: user._id.toString(),
        name: user.name,
        type: user.type
      }
    };

  } catch (error) {
    throw new Error(`Erro ao fazer login: ${error.message}`);
  }
};

const logout = async (token) => {
  try {
    const session = await Session.findOneAndUpdate(
      { token, active: true },
      { active: false },
      { new: true }
    );

    if (!session) {
      throw new Error('Sessão não encontrada');
    }

    return { ok: true, message: 'Logout realizado com sucesso' };

  } catch (error) {
    throw new Error(`Erro ao fazer logout: ${error.message}`);
  }
};

const logoutAll = async (userId) => {
  try {
    await Session.updateMany(
      { userId, active: true },
      { active: false }
    );

    return { ok: true, message: 'Todas as sessões foram encerradas' };

  } catch (error) {
    throw new Error(`Erro ao encerrar sessões: ${error.message}`);
  }
};

const getAuthenticatedUser = async (userId) => {
  try {
    const user = await User.findOne({
      _id: userId,
      deleted: false
    }).select('-password');

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    return user;

  } catch (error) {
    throw new Error(`Erro ao buscar usuário: ${error.message}`);
  }
};

const getActiveSessions = async (userId) => {
  try {
    const sessions = await Session.find({
      userId,
      active: true,
      expiresAt: { $gt: new Date() }
    }).sort({ createdAt: -1 });

    return sessions;

  } catch (error) {
    throw new Error(`Erro ao buscar sessões: ${error.message}`);
  }
};

module.exports = {
  login,
  logout,
  logoutAll,
  getAuthenticatedUser,
  getActiveSessions
};