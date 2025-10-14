const express = require('express');
const router = express.Router();
const estoqueController = require('../controllers/estoqueController');

/**
 * @swagger
 * /estoque:
 *   get:
 *     summary: Retorna todos os produtos do estoque
 *     responses:
 *       200:
 *         description: Lista de produtos
 */
router.get('/', estoqueController.listarProdutos);

/**
 * @swagger
 * /estoque/filtrar:
 *   get:
 *     summary: Filtra produtos por critérios
 *     responses:
 *       200:
 *         description: Produtos filtrados com sucesso
 */
router.get('/filtrar', estoqueController.filtrarProduto);

/**
 * @swagger
 * /estoque/novo:
 *   post:
 *     summary: Cadastra um novo produto no estoque
 *     responses:
 *       201:
 *         description: Produto cadastrado com sucesso
 */
router.post('/novo', estoqueController.cadastrarProduto);

module.exports = router;
