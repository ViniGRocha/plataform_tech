import * as User from '../model/userModel.js'; // esta importando todas as funçoes do arquivo mencionado.

export const getUsers = async (req, res) => {
    try {
        const users = await User.getAllUsers ();
        res.json(users);
    } catch (err) {
        res.status (500).json ({ error: "Erro ao buscar usuarios"});

    }
};