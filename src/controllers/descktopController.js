// src/controllers/descktopController.js

exports.alertaEstoque = (req, res) => {
  res.json({ mensagem: 'Alertas de estoque' });
};

exports.alertaPedido = (req, res) => {
  res.json({ mensagem: 'Alertas de pedidos' });
};

exports.filtrarGrafico = (req, res) => {
  res.json({ mensagem: 'Gráficos filtrados com sucesso' });
};

exports.grafico1 = (req, res) => {
  res.json({ mensagem: 'Dados do gráfico 1' });
};

exports.grafico2 = (req, res) => {
  res.json({ mensagem: 'Dados do gráfico 2' });
};
