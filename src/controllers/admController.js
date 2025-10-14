// src/controllers/admController.js

exports.listarFuncoes = (req, res) => {
  res.json({ mensagem: 'Lista funcionalidades ADM' });
};

exports.usuarioFuncoes = (req, res) => {
  res.json({ mensagem: 'Lista funcionalidades usuário' });
};

exports.confirmar = (req, res) => {
  res.json({ mensagem: 'Ação confirmada pelo ADM' });
};

exports.excluir = (req, res) => {
  res.json({ mensagem: `Usuário/ADM ${req.params.id} excluído` });
};
