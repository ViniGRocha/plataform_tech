import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

router.post("/chat", async (req, res) => {
  const { conversation } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [
          {
            role: "system",
            content: `Você é um orientador de carreira em tecnologia. 
            Analise as respostas do usuário e diga qual trilha mais combina com ele: 
            Front-end, Back-end, UX/UI, Data Science ou DevOps.
            Seja claro, amigável e motivador.`
          },
          {
            role: "user",
            content: `Aqui estão as respostas do usuário: ${conversation.join(" ")}`
          }
        ]
      })
    });

    const data = await response.json();
    const reply = data.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Erro ao processar a IA." });
  }
});

export default router;
