import * as User from '../models/userModels.js';
import bcrypt from 'bcrypt';
import db from '../config/db.js';

// Listar usuários
export const getUsers = async (req, res) => {
    try {
        const users = await User.getAllUsers();
        // Não retorna senha
        const usersSafe = users.map(u => ({ id: u.id, nome: u.nome, email: u.email }));
        res.json(usersSafe);
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar usuários" });
    }
};

// Criar usuário
export const createUser = async (req, res) => {
    console.log("Chegou req.body:", req.body);
    const { nome, email, senha_hash, confirmar_senha } = req.body;

    try {
        if (senha_hash !== confirmar_senha) {
            return res.status(400).json({ error: "As senhas não conferem" });
        }

        const hashedPassword = await bcrypt.hash(senha_hash, 10);

        const newUser = await User.createUser(nome, email, hashedPassword);

        return res.redirect("/login.html");


    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro ao criar usuário" });
    }
};

// Atualizar usuário
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { nome, email, senha_hash } = req.body;

    try {
        let hashedPassword = senha_hash ? await bcrypt.hash(senha_hash, 10) : undefined;

        const updatedUser = await User.updateUser(id, nome, email, hashedPassword);

        if (!updatedUser) return res.status(404).json({ error: "Usuário não encontrado" });

        res.json({
            id: updatedUser.id,
            nome: updatedUser.nome,
            email: updatedUser.email
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao atualizar usuário" });
    }
};

// Deletar usuário
export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await User.deleteUser(id);
        if (!deleted) return res.status(404).json({ error: "Usuário não encontrado" });

        res.json({ message: "Usuário deletado com sucesso" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao deletar usuário" });
    }
};


//Login Usuario
export const loginUser = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const [user] = await db.query(
            'SELECT * FROM usuarios WHERE email = ?',
            [email]
        );

        if (user.length === 0) {
            return res.status(400).send(`
                <script>
                    alert("Usuário não encontrado!");
                    window.location.href = "/login.html";
                </script>
            `);
        }

        const usuario = user[0];
        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            return res.status(400).send(`
                <script>
                    alert("Senha incorreta!");
                    window.location.href = "/login.html";
                </script>
            `);
        }

        // Login OK → redireciona
        return res.send(`
            <script>
                alert("Login realizado com sucesso!");
                window.location.href = "/home.html";
            </script>
        `);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Erro ao fazer login' });
    }
};

