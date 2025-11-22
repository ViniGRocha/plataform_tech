const QUESTIONS = [
  {
    title: "O que mais te atrai em tecnologia?",
    options: ["Design", "Programação", "Dados", "Infraestrutura"]
  },
  {
    title: "Você gosta mais de lidar com pessoas ou com sistemas e códigos?",
    options: ["lidar com pessoas", "sistemas e códigos"]
  },
  {
    title: "Prefere ver o resultado visual do seu trabalho ou trabalhar nos bastidores?",
    options: ["resultado visual do seu trabalho", "trabalhar nos bastidores"]
  },
  {
    title: "O que te empolga mais: lógica, criatividade, análise de dados ou automação?",
    options: ["lógica", "criatividade", "análise de dados", "automação"]
  },
  {
    title: "Gosta de resolver problemas técnicos ou pensar na experiência do usuário?",
    options: ["resolver problemas técnicos", "pensar na experiência do usuário"]
  },
  {
    title: "Como você se imagina trabalhando no futuro?",
    options: ["design", "servidores", "dados", "código", "automação"]
  }
];

let current = 0;
const answers = new Array(QUESTIONS.length).fill(null);

const questionTitle = document.getElementById("questionTitle");
const optionsEl = document.getElementById("options");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const progressPercent = document.getElementById("progressPercent");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

function renderQuestion(index) {
  const q = QUESTIONS[index];

  questionTitle.textContent = q.title;
  optionsEl.innerHTML = "";

  q.options.forEach((opt, i) => {
    const div = document.createElement("label");
    div.className = "option";
    if (answers[index] === i) div.classList.add("selected");

    div.innerHTML = `
      <input type="radio" name="q${index}" value="${opt}">
      <div class="radio">${answers[index] === i ? "●" : ""}</div>
      <div class="text"><strong>${opt}</strong></div>
    `;

    div.addEventListener("click", () => {
      answers[index] = i;
      [...optionsEl.children].forEach(c => c.classList.remove("selected"));
      div.classList.add("selected");
    });

    optionsEl.appendChild(div);
  });

  const pct = Math.round((index / (QUESTIONS.length - 1)) * 100);
  progressBar.style.width = pct + "%";
  progressText.textContent = `Pergunta ${index + 1} de ${QUESTIONS.length}`;
  progressPercent.textContent = pct + "%";

  prevBtn.disabled = index === 0;
  nextBtn.textContent = index === QUESTIONS.length - 1 ? "Concluir →" : "Próxima →";
}

prevBtn.addEventListener("click", () => {
  if (current > 0) {
    current--;
    renderQuestion(current);
  }
});

nextBtn.addEventListener("click", () => {
  if (answers[current] === null) {
    optionsEl.classList.add("shake");
    setTimeout(() => optionsEl.classList.remove("shake"), 400);
    return;
  }

  if (current < QUESTIONS.length - 1) {
    current++;
    renderQuestion(current);
  } else {
    showResults();
  }
});

function showResults() {
  const finalAnswers = answers.map((a, i) => ({
    question: QUESTIONS[i].title,
    answer: QUESTIONS[i].options[a]
  }));

  const panel = document.getElementById("questionPanel");

  panel.innerHTML = `
    <div style="padding:18px;">
      <h3 style="color:#4b3ca5;">Suas respostas</h3>
      <ul id="answersList" style="margin-bottom:20px;"></ul>
      <button id="restartBtn" class="btn primary">Refazer Quiz</button>
    </div>
  `;

  const ul = document.getElementById("answersList");

  finalAnswers.forEach((obj, i) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${i + 1}.</strong> ${obj.answer}`;
    ul.appendChild(li);
  });

  progressBar.style.width = "100%";
  progressText.textContent = "Concluído";
  progressPercent.textContent = "100%";

  prevBtn.style.display = "none";
  nextBtn.style.display = "none";

  document.getElementById("restartBtn").addEventListener("click", () => location.reload());
}

window.addEventListener("load", () => renderQuestion(0));
