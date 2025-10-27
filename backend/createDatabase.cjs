require('dotenv').config();
const { Client } = require('pg');

async function createDatabase() {
  const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

  console.log('Variáveis de ambiente carregadas:');
  console.log({ DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME });

  const client = new Client({
    host: DB_HOST,
    port: Number(DB_PORT),
    user: DB_USER,
    password: DB_PASSWORD,
    database: 'postgres' // conecta ao DB padrão para criar outro
  });

  try {
    console.log('Tentando conectar ao PostgreSQL...');
    await client.connect();
    console.log('Conexão estabelecida!');
    const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [DB_NAME]);
    if (res.rowCount === 0) {
      await client.query(`CREATE DATABASE "${DB_NAME}"`);
      console.log(`Banco "${DB_NAME}" criado com sucesso.`);
    } else {
      console.log(`Banco "${DB_NAME}" já existe.`);
    }
  } catch (err) {
    console.error('Erro ao criar banco:', err);
  } finally {
    await client.end();
    console.log('Conexão encerrada.');
  }
}

createDatabase();
