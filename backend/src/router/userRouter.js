import express from 'express';
import { createUser, loginUser } from '../controller/userController.js';

const router = express.Router();

// Rotas
router.post('/', createUser);      // Criar novo usuário
router.post('/login', loginUser);  // Login de usuário


export default router;
