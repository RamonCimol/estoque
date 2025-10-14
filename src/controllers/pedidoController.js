// src/controllers/pedidoController.js

exports.listarPedidos = (req, res) => {
  res.json({ mensagem: 'Lista de pedidos' });
};

exports.filtrarPedidos = (req, res) => {
  res.json({ mensagem: 'Pedidos filtrados' });
};

exports.novoPedido = (req, res) => {
  res.json({ mensagem: 'Novo pedido criado' });
};

exports.buscarItem = (req, res) => {
  res.json({ mensagem: 'Item buscado no estoque' });
};

exports.adicionarItem = (req, res) => {
  res.json({ mensagem: 'Item adicionado ao pedido' });
};

exports.editarItem = (req, res) => {
  res.json({ mensagem: `Item ${req.params.itemId} editado` });
};

exports.excluirItem = (req, res) => {
  res.json({ mensagem: `Item ${req.params.itemId} excluído` });
};

exports.cancelarPedido = (req, res) => {
  res.json({ mensagem: 'Pedido cancelado' });
};

exports.concluirPedido = (req, res) => {
  res.json({ mensagem: 'Pedido concluído' });
};

exports.baixarArquivo = (req, res) => {
  res.json({ mensagem: 'Arquivo do pedido baixado' });
};

exports.editarPedido = (req, res) => {
  res.json({ mensagem: `Pedido ${req.params.pedidoId} editado` });
};

exports.excluirPedido = (req, res) => {
  res.json({ mensagem: `Pedido ${req.params.pedidoId} excluído` });
};
