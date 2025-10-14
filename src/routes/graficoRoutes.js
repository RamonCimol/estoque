const express = require('express');
const router = express.Router();
const graficoController = require('../controllers/graficoController');

/**
 * @swagger
 * /grafico/filtrar:
 *   get:
 *     summary: Filtra dados para geração de gráficos
 *     responses:
 *       200:
 *         description: Dados filtrados para gráficos
 */
router.get('/filtrar', graficoController.filtrar);

/**
 * @swagger
 * /grafico/grafico1:
 *   get:
 *     summary: Retorna dados do gráfico 1
 *     responses:
 *       200:
 *         description: Dados obtidos com sucesso
 */
router.get('/grafico1', graficoController.grafico1);

/**
 * @swagger
 * /grafico/grafico2:
 *   get:
 *     summary: Retorna dados do gráfico 2
 *     responses:
 *       200:
 *         description: Dados obtidos com sucesso
 */
router.get('/grafico2', graficoController.grafico2);

module.exports = router;
