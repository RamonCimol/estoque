// src/controllers/estoqueController.js

exports.listarProdutos = (req, res) => {
  res.json({ mensagem: 'Lista de produtos' });
};

exports.filtrarProduto = (req, res) => {
  res.json({ mensagem: 'Produto filtrado' });
};

exports.cadastrarProduto = (req, res) => {
  res.json({ mensagem: 'Produto cadastrado' });
};
