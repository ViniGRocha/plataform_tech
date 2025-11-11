import express from 'express';
import userRouter from './src/router/userRouter.js';


const app = express();

//porta do servidor
const PORT = 3000;

//rota do usuario
app.use (express.json ());
app.use ('/usuarios', userRouter);
app.get('/', (req, res) => {
    res.json(arrResponse);   
})

//inicia o servidor
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// middleware para interpretar dados de formulários html
app.use (express.urlencoded({ etended: true }));