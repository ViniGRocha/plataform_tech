import pool from '../config/db.js';

// Listar todos os usuários
export const getAllUsers = async () => {
    const result = await pool.query("SELECT * FROM usuarios");
    return result.rows;
};

// Criar usuário
export const createUser = async (nome, email, senha_hash) => {
    const result = await pool.query(
        "INSERT INTO usuarios (nome, email, senha_hash) VALUES ($1, $2, $3) RETURNING *",
        [nome, email, senha_hash]
    );
    return result.rows[0]; // ⚠️ importante retornar o usuário criado
};

// Atualizar usuário
export const updateUser = async (id, nome, email, senha_hash) => {
    const values = [nome, email];
    let query = "UPDATE usuarios SET nome = $1, email = $2";

    if (senha_hash) {
        query += ", senha_hash = $3 WHERE id = $4 RETURNING *";
        values.push(senha_hash, id);
    } else {
        query += " WHERE id = $3 RETURNING *";
        values.push(id);
    }

    const result = await pool.query(query, values);
    return result.rows[0];
};

// Deletar usuário
export const deleteUser = async (id) => {
    const result = await pool.query("DELETE FROM usuarios WHERE id = $1 RETURNING *", [id]);
    return result.rows[0]; // retorna usuário deletado, se existir
};
