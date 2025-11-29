import express from 'express';
import { getUsers, createUser, loginUser } from '../controller/userController.js';

const router = express.Router();

// Rotas
router.get('/', getUsers);         // Listar todos usuários
router.post('/', createUser);      // Criar novo usuário
router.post('/login', loginUser); 



export default router;
