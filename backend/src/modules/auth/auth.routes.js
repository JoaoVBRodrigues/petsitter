const express = require('express');
const authController = require('./auth.controller');

const router = express.Router();

const authMiddleware = require('../../middlewares/authMiddleware');
const validatePayload = require('../../middlewares/validatePayload');
const { z } = require('zod');

const registerSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  role: z.enum(['OWNER', 'SITTER'])
});

router.post('/register', validatePayload(registerSchema), authController.register);
router.post('/login', authController.login);
router.get('/me', authMiddleware, (req, res) => res.json(req.user));

module.exports = router;
