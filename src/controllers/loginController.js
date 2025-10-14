// src/controllers/loginController.js
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.login = (req, res) => {
  const { email, senha } = req.body;

  // Exemplo simples de validação de usuário
  if (email === 'admin@exemplo.com' && senha === 'Ra10203!') {
    const payload = { email, role: 'admin' };
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });

    return res.json({ mensagem: 'Login efetuado!', token });
  }

  res.status(401).json({ mensagem: 'Usuário ou senha inválidos!' });
};
exports.novaSenha = (req, res) => {
  res.json({ mensagem: 'Nova senha gerada!' });
}

exports.novaSenha = (req, res) => {
  res.json({ mensagem: 'Nova senha gerada!' });
};

exports.esqueciSenha = (req, res) => {
  res.json({ mensagem: 'Código de verificação enviado!' });
};

exports.codigoVerificacao = (req, res) => {
  res.json({ mensagem: 'Código verificado!' });
};

exports.confirmarNovaSenha = (req, res) => {
  res.json({ mensagem: 'Nova senha confirmada!' });
};
