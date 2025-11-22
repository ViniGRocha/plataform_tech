import express from 'express';
import { getUsers, createUser, updateUser, deleteUser, loginUser } from '../controller/userController.js';

const router = express.Router();

// Rotas
router.get('/', getUsers);         // Listar todos usuários
router.post('/', createUser);      // Criar novo usuário
router.put('/:id', updateUser);    // Atualizar usuário pelo id
router.delete('/:id', deleteUser); // Deletar usuário pelo id
router.post('/login', loginUser); 



export default router;
