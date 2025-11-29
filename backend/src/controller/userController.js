import * as User from '../models/userModels.js';
import bcrypt from 'bcrypt';

// Listar usuários
export const getUsers = async (req, res) => {
    try {
        const users = await User.getAllUsers();
        const usersSafe = users.map(u => ({
            id: u.id,
            nome: u.nome,
            email: u.email
        }));
        res.json(usersSafe);
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar usuários" });
    }
};

// Criar usuário
export const createUser = async (req, res) => {
    console.log("Chegou req.body:", req.body);
    const { nome, email, senha } = req.body;

    try {
        // Hash
        const hashedPassword = await bcrypt.hash(senha, 10);

        // Envia para o model
        const newUser = await User.createUser(nome, email, hashedPassword);

        return res.status(201).json({
            message: "Usuário criado com sucesso",
            user: { id: newUser.id, nome: newUser.nome, email: newUser.email }
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro ao criar usuário" });
    }
};

// Login
export const loginUser = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const users = await User.getUserByEmail(email);

        if (users.length === 0) {
            return res.status(401).json({ message: "Usuário não encontrado" });
        }

        const usuario = users[0];
        const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);

        if (!senhaValida) {
            return res.status(401).json({ message: "Senha incorreta" });
        }

        // Login OK
        return res.json({
            user: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao fazer login' });
    }
};
