const express = require('express');
const router = express.Router();
const admController = require('../controllers/admController');

/**
 * @swagger
 * /adm:
 *   get:
 *     summary: Lista funcionalidades do administrador
 *     responses:
 *       200:
 *         description: Funcionalidades do administrador listadas
 */
router.get('/', admController.listarFuncoes);

/**
 * @swagger
 * /adm/usuario:
 *   get:
 *     summary: Lista funcionalidades do usuário administrador
 *     responses:
 *       200:
 *         description: Funcionalidades do usuário listadas
 */
router.get('/usuario', admController.usuarioFuncoes);

/**
 * @swagger
 * /adm/confirmar:
 *   post:
 *     summary: Confirma uma ação do administrador
 *     responses:
 *       200:
 *         description: Ação confirmada com sucesso
 */
router.post('/confirmar', admController.confirmar);

/**
 * @swagger
 * /adm/excluir/{id}:
 *   delete:
 *     summary: Exclui um administrador ou usuário
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 123
 *         description: ID do administrador ou usuário a ser excluído
 *     responses:
 *       200:
 *         description: Administrador ou usuário excluído com sucesso
 */
router.delete('/excluir/:id', admController.excluir);

module.exports = router;
