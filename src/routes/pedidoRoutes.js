const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');

/**
 * @swagger
 * /pedido:
 *   get:
 *     summary: Lista todos os pedidos
 *     responses:
 *       200:
 *         description: Lista de pedidos
 */
router.get('/', pedidoController.listarPedidos);

/**
 * @swagger
 * /pedido/filtrar:
 *   get:
 *     summary: Filtra pedidos por parâmetros
 *     responses:
 *       200:
 *         description: Pedidos filtrados
 */
router.get('/filtrar', pedidoController.filtrarPedidos);

/**
 * @swagger
 * /pedido/novo:
 *   post:
 *     summary: Cria um novo pedido
 *     responses:
 *       200:
 *         description: Pedido criado
 */
router.post('/novo', pedidoController.novoPedido);

/**
 * @swagger
 * /pedido/novo/buscar-item:
 *   get:
 *     summary: Busca item no estoque para adicionar ao pedido
 *     responses:
 *       200:
 *         description: Item encontrado
 */
router.get('/novo/buscar-item', pedidoController.buscarItem);

/**
 * @swagger
 * /pedido/novo/adicionar-item:
 *   post:
 *     summary: Adiciona item ao pedido em andamento
 *     responses:
 *       200:
 *         description: Item adicionado
 */
router.post('/novo/adicionar-item', pedidoController.adicionarItem);

/**
 * @swagger
 * /pedido/novo/editar-item/{itemId}:
 *   put:
 *     summary: Edita um item do pedido
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item editado
 */
router.put('/novo/editar-item/:itemId', pedidoController.editarItem);

/**
 * @swagger
 * /pedido/novo/excluir-item/{itemId}:
 *   delete:
 *     summary: Exclui item selecionado do pedido
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item excluído
 */
router.delete('/novo/excluir-item/:itemId', pedidoController.excluirItem);

/**
 * @swagger
 * /pedido/novo/cancelar:
 *   post:
 *     summary: Cancela pedido em andamento
 *     responses:
 *       200:
 *         description: Pedido cancelado
 */
router.post('/novo/cancelar', pedidoController.cancelarPedido);

/**
 * @swagger
 * /pedido/novo/concluir:
 *   post:
 *     summary: Conclui o pedido atual
 *     responses:
 *       200:
 *         description: Pedido concluído
 */
router.post('/novo/concluir', pedidoController.concluirPedido);

/**
 * @swagger
 * /pedido/novo/baixar-arquivo:
 *   get:
 *     summary: Baixa o arquivo do pedido concluído
 *     responses:
 *       200:
 *         description: Arquivo baixado
 */
router.get('/novo/baixar-arquivo', pedidoController.baixarArquivo);

/**
 * @swagger
 * /pedido/editar/{pedidoId}:
 *   put:
 *     summary: Edita pedido existente
 *     parameters:
 *       - in: path
 *         name: pedidoId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pedido editado
 */
router.put('/editar/:pedidoId', pedidoController.editarPedido);

/**
 * @swagger
 * /pedido/excluir/{pedidoId}:
 *   put:
 *     summary: Exclui pedido existente
 *     parameters:
 *       - in: path
 *         name: pedidoId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pedido excluido
 */
router.delete('/excluir/:pedidoId', pedidoController.excluirPedido);

module.exports = router;
