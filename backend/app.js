import express from 'express';
import userRouter from './src/router/userRouter.js';
import path from 'path';

const app = express();
const PORT = 3000;
const __dirname = path.resolve();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir HTML, CSS, JS e imagens
app.use(express.static(path.join(__dirname, 'frontend')));

// Rotas de usuário
app.use('/usuarios', userRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
