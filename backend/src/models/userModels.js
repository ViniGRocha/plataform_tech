import pool from '../config/db.js';


//criando uma função que busca todos os usuarios no banco de dados.
export const getAllUsers = async () => {
    const result = await pool.query ("SELECT * FROM usuarios");
    return result.rows;
}


//criando uma função que vai inserir um noo usuario no banco de dados utilziando os parametros de nome, e-mail e senha.
export const createUser = async (nome, email, senha_hash) => {
    const result = await pool.query (
        "INSERT INTO usuarios (nome, email, senha_hash) VALUES ($1, $2, $3) RETURNING *", 
        [nome, email, senha_hash]);
}


// criando uma função que atualiza os dados de um usuario no banco de dados utilizando os parametros id, nome, e-mail e senha.
export const updateUser = async (id, nome, email, senha_hash) => {
    const result = await pool.query (
        "UPDATE usuarios SET nome = $1, email = $2, senha_hash = $3 WHERE id = $4 RETURNING *",
        [nome, email, senha_hash, id]);
    return result.rows[0];
}

export const deleteUser = async (id) => {
    await pool.query ("DELETE FROM usuarios WHERE id = $1", [id]);
};