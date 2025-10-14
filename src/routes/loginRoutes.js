const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Realiza login do usuário
 *     responses:
 *       200:
 *         description: Login efetuado
 */
router.post('/', loginController.login);

/**
 * @swagger
 * /login/nova-senha:
 *   post:
 *     summary: Gera nova senha
 *     responses:
 *       200:
 *         description: Nova senha gerada
 */
router.post('/nova-senha', loginController.novaSenha);

/**
 * @swagger
 * /login/esqueci-senha:
 *   post:
 *     summary: Solicita código de verificação
 *     responses:
 *       200:
 *         description: Código enviado
 */
router.post('/esqueci-senha', loginController.esqueciSenha);

/**
 * @swagger
 * /login/codigo-verificacao:
 *   post:
 *     summary: Valida código de verificação
 *     responses:
 *       200:
 *         description: Código verificado
 */
router.post('/codigo-verificacao', loginController.codigoVerificacao);

/**
 * @swagger
 * /login/nova-senha-confirmacao:
 *   post:
 *     summary: Confirma nova senha após verificação
 *     responses:
 *       200:
 *         description: Nova senha confirmada
 */
router.post('/nova-senha-confirmacao', loginController.confirmarNovaSenha);

module.exports = router;
