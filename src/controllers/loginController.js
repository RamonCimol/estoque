// src/controllers/loginController.js

exports.login = (req, res) => {
  res.json({ mensagem: 'Login efetuado!' });
};

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
