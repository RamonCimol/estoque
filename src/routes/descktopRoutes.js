const express = require('express');
const router = express.Router();
const descktopController = require('../controllers/descktopController');

/**
 * @swagger
 * /descktop/alerta-estoque:
 *   get:
 *     summary: Retorna alertas de estoque
 *     responses:
 *       200:
 *         description: Lista de alertas de estoque
 */
router.get('/alerta-estoque', descktopController.alertaEstoque);

/**
 * @swagger
 * /descktop/alerta-pedido:
 *   get:
 *     summary: Retorna alertas de pedidos
 *     responses:
 *       200:
 *         description: Lista de alertas de pedidos
 */
router.get('/alerta-pedido', descktopController.alertaPedido);

/**
 * @swagger
 * /descktop/grafico/filtrar:
 *   get:
 *     summary: Filtra os gráficos por parâmetros específicos
 *     responses:
 *       200:
 *         description: Gráficos filtrados com sucesso
 */
router.get('/grafico/filtrar', descktopController.filtrarGrafico);

/**
 * @swagger
 * /descktop/grafico1:
 *   get:
 *     summary: Retorna o primeiro tipo de gráfico
 *     responses:
 *       200:
 *         description: Dados do gráfico 1
 */
router.get('/grafico1', descktopController.grafico1);

/**
 * @swagger
 * /descktop/grafico2:
 *   get:
 *     summary: Retorna o segundo tipo de gráfico
 *     responses:
 *       200:
 *         description: Dados do gráfico 2
 */
router.get('/grafico2', descktopController.grafico2);

module.exports = router;
