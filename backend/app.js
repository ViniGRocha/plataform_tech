import express from 'express';
import userRouter from './src/router/userRouter.js';
import path from 'path';

const app = express();
const PORT = 3000;
const __dirname = path.resolve();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir a pasta frontend fora do backend
app.use(express.static(path.join(__dirname, '..', 'frontend')));


// Rotas do site web

//HOME
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend/home/home.html'));
});

//CADASTRO (REGISTRO)
app.get('/registro', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend/registro/registro.html'));
});


//LOGIN
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend/login/login.html'));
})

//QUIZ
app.use(express.static(path.join(__dirname, '..', 'frontend/quizweb')));

app.get('/quiz', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend/quizweb/quiz.html'));
})




//RESULTADO
app.get('/resultado', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend/resultado/resultado.html'));
})


//CHATBOT
app.get('/chat', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend/Chatbot/chat.html'));
})

app.post('/api/chat/result', (req, res) => {
  const { conversation } = req.body;

  let score = {
    design: 0,
    programacao: 0,
    dados: 0,
    infraestrutura: 0
  };

  const texto = conversation.join(" ").toLowerCase();

  if (texto.includes("design") || texto.includes("visual") || texto.includes("ux")) {
    score.design += 3;
  }

  if (texto.includes("program") || texto.includes("código") || texto.includes("logica")) {
    score.programacao += 3;
  }

  if (texto.includes("dados") || texto.includes("analise") || texto.includes("estatistica")) {
    score.dados += 3;
  }

  if (texto.includes("servidor") || texto.includes("infra") || texto.includes("rede")) {
    score.infraestrutura += 3;
  }

  let trilha = "Generalista";
  let maior = 0;

  for (const area in score) {
    if (score[area] > maior) {
      maior = score[area];
      trilha = area;
    }
  }

  const respostas = {
    design: "🎨 Você combina com Design / UX!",
    programacao: "💻 Você combina com Programação!",
    dados: "📊 Você combina com Dados!",
    infraestrutura: "🖥️ Você combina com Infraestrutura!"
  };

  res.json({
    reply: respostas[trilha] || "Não consegui identificar sua trilha, tente de novo!"
  });
});


// Rotas da API
app.use('/usuarios', userRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
