import pool from '../config/db.js';


// Criar usuário
export const createUser = async (nome, email, senha_hash) => {
    const result = await pool.query(
        "INSERT INTO usuarios (nome, email, senha_hash) VALUES ($1, $2, $3) RETURNING *",
        [nome, email, senha_hash]
    );
    return result.rows[0];
};

// Buscar usuário por email - login
export const getUserByEmail = async (email) => {
    const result = await pool.query(
        "SELECT * FROM usuarios WHERE email = $1",
        [email]
    );
    return result.rows;
};

