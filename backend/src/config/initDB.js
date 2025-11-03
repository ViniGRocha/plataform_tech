import pool from './db.js';

console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);

async function criarTabelas() {
  try {
    // Usuários
    await pool.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        senha_hash VARCHAR(200) NOT NULL,
        data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Áreas de TI
    await pool.query(`
      CREATE TABLE IF NOT EXISTS areas_ti (
        id SERIAL PRIMARY KEY,
        nome_area VARCHAR(100) NOT NULL,
        descricao TEXT
      );
    `);

    // Quizzes
    await pool.query(`
      CREATE TABLE IF NOT EXISTS quizzes (
        id SERIAL PRIMARY KEY,
        titulo VARCHAR(150) NOT NULL,
        descricao TEXT,
        ativo BOOLEAN DEFAULT true
      );
    `);

    // Perguntas
    await pool.query(`
      CREATE TABLE IF NOT EXISTS perguntas (
        id SERIAL PRIMARY KEY,
        quiz_id INT REFERENCES quizzes(id) ON DELETE CASCADE,
        texto_pergunta TEXT NOT NULL
      );  
    `);

    // Opções de resposta
    await pool.query(`
      CREATE TABLE IF NOT EXISTS opcoes_resposta (
        id SERIAL PRIMARY KEY,
        pergunta_id INT REFERENCES perguntas(id) ON DELETE CASCADE,
        texto_opcao TEXT NOT NULL,
        peso INT DEFAULT 0
      );
    `);

    // Respostas do usuário
    await pool.query(`
      CREATE TABLE IF NOT EXISTS respostas_usuario (
        id SERIAL PRIMARY KEY,
        usuario_id INT REFERENCES usuarios(id) ON DELETE CASCADE,
        pergunta_id INT REFERENCES perguntas(id) ON DELETE CASCADE,
        opcao_id INT REFERENCES opcoes_resposta(id),
        data_resposta TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Resultados
    await pool.query(`
      CREATE TABLE IF NOT EXISTS resultados (
        id SERIAL PRIMARY KEY,
        usuario_id INT REFERENCES usuarios(id) ON DELETE CASCADE,
        area_ti_id INT REFERENCES areas_ti(id),
        score INT DEFAULT 0,
        data_resultado TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('Tabelas criadas com sucesso.');
  } catch (err) {
    console.error('Erro ao criar tabelas:', err.message);
  } finally {
    await pool.end();
  }
}

criarTabelas();
