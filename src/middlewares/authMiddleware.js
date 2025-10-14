// src/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config(); // carrega variável SECRET_KEY do .env

function autenticarToken(req, res, next) {
  // 1. Pegar o token do header Authorization
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer <token>"

  if (!token) {
    return res.status(401).json({ mensagem: 'Acesso negado. Token não fornecido.' });
  }

  // 2. Verificar se o token é válido
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ mensagem: 'Token inválido ou expirado.' });
    }

    // 3. Salvar dados do usuário no request para uso posterior
    req.user = user;
    next(); // libera acesso à rota
  });
}

module.exports = autenticarToken;
