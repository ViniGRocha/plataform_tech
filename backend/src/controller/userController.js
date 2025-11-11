import * as User from '../models/userModels.js'; // esta importando todas as funçoes do arquivo mencionado.

//guscar todos os usuarios
export const getUsers = async (req, res) => {
    try {
        const users = await User.getAllUsers ();
        res.json(users);
    } catch (err) {
        res.status (500).json ({ error: "Erro ao buscar usuarios"});

    }
};


//criar usuario
export const createUser = async (req, res) =>{
    const {nome, email, senha_hash, confirmar_senha} = req.body;

    try{
        if (senha_hash !== confirmar_senha){
            return res.status (400).json ({error: "As senhas nao conferem"})
        }

        const newUser = await User.createUser (nome, email, senha_hash);
        if (!updateUser) return res.status (404).json ({error: "Usuario nao encontrado"});
        res.json (updateUser);
    } catch (err) {
        console.error (err);
        res.status (500).json ({error: "Erro ao criar usuario"});

    }
};

//atualizar usuario
export const updateUser = async (req, res) => {
    const {id} = req.params;
    const {nome, email, senha_hash} = req.body;
    try {
        const updateUser = await User.updateUser (id, nome, email, senha_hash);
        if (!updateUser) return res.status (404).json ({error: "Usuario nao encontrado"});
        res.json (updateUser);
    } catch (err) {
        console.error (err);
        res.status (500).json ({error: "Erro ao atualizar usuario"});
    }
};

//deletar usuario
export const deleteUser = async (req,res) => {
    const {id} = req.params;
    try{
        await User.deleteUser (id);
        res.json ({message: "Usuario deletado com sucesso"});
    } catch (err) {
        console.error (err);
        res.status (500).json ({error: "Erro ao deletar usuario"});
    }
};

