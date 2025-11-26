// ---------------------------------------------
// 1. PERGUNTAS DO QUIZ
// ---------------------------------------------
const questions = [
  {
    title: "Qual área da tecnologia mais te interessa?",
    options: [
      { value: "ux_ui", label: "Criar interfaces visuais e experiências de usuário" },
      { value: "backend", label: "Trabalhar com dados e lógica de negócios" },
      { value: "data_ia", label: "Análise de dados e inteligência artificial" },
      { value: "infra", label: "Infraestrutura e segurança de sistemas" },
    ]
  },
  {
    title: "Como você gostaria de trabalhar?",
    options: [
      { value: "design", label: "Criando designs e interfaces visuais" },
      { value: "apis", label: "Programando APIs e sistemas robustos" },
      { value: "ia", label: "Analisando padrões e treinando modelos" },
      { value: "servidores", label: "Configurando servidores e redes" },
    ]
  },
  {
    title: "Qual tipo de projeto te empolga mais?",
    options: [
      { value: "interfaces", label: "Um aplicativo mobile ou website bonito" },
      { value: "sistemas", label: "Um sistema escalável e eficiente" },
      { value: "previsao", label: "Um modelo de previsão ou recomendação" },
      { value: "infra_cloud", label: "Uma infraestrutura cloud segura" },
    ]
  },
  {
    title: "Qual skill você já tem ou gostaria de desenvolver?",
    options: [
      { value: "front", label: "HTML, CSS e JavaScript" },
      { value: "backend", label: "Node.js, Python ou Java" },
      { value: "data", label: "Python, estatística e matemática" },
      { value: "infra", label: "Linux, Docker e redes" },
    ]
  },
  {
    title: "O que te motiva em um trabalho?",
    options: [
      { value: "visual", label: "Ver o resultado visual do meu trabalho" },
      { value: "logica", label: "Resolver problemas complexos de lógica" },
      { value: "insights", label: "Descobrir insights através de dados" },
      { value: "seguranca", label: "Garantir estabilidade e segurança" },
    ]
  },
  {
    title: "Em qual ambiente você se sente mais confortável?",
    options: [
      { value: "criativo", label: "Trabalhando com design e criatividade" },
      { value: "codando", label: "Codificando soluções backend" },
      { value: "dados", label: "Explorando dados e criando modelos" },
      { value: "sistemas", label: "Gerenciando servidores e sistemas" },
    ]
  }
];

let current = 0;
let answers = {};

// ---------------------------------------------
// 2. RENDERIZA A PERGUNTA ATUAL
// ---------------------------------------------
function renderQuestion() {
  const q = questions[current];

  // TÍTULO
  document.getElementById("question-title").innerText = q.title;

  // PROGRESSO
  const percent = Math.round(((current + 1) / questions.length) * 100);
  document.getElementById("progress-text").innerText = `Pergunta ${current + 1} de ${questions.length}`;
  document.getElementById("progress-bar").style.width = `${percent}%`;

  // OPÇÕES
  const container = document.getElementById("options-container");
  container.innerHTML = "";
  q.options.forEach(opt => {
    const checked = answers[current] === opt.value ? "checked" : "";
    container.innerHTML += `
      <label class="block">
        <input type="radio" name="option" value="${opt.value}" ${checked} class="hidden peer">
        <div class="p-5 rounded-xl border border-gray-300 bg-white
                    transition cursor-pointer select-none
                    peer-hover:border-tech-primary/50
                    peer-checked:border-tech-primary 
                    peer-checked:bg-tech-primary/10
                    peer-checked:shadow-md
                    peer-checked:scale-[1.02]
                    relative">
          <div class="absolute right-4 top-4 opacity-0 peer-checked:opacity-100 transition">
            <svg class="w-5 h-5 text-tech-primary" fill="none" stroke="currentColor" stroke-width="2"
              viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div class="flex items-center gap-4">
            <span class="w-5 h-5 rounded-full border-2 border-gray-400 
                         transition-all
                         peer-checked:border-tech-primary
                         peer-checked:bg-tech-primary">
            </span>
            <p class="text-gray-700 peer-checked:text-tech-primary font-medium">${opt.label}</p>
          </div>
        </div>
      </label>
    `;
  });

  // BOTÃO "ANTERIOR"
  const prev = document.getElementById("btn-prev");
  prev.disabled = current === 0;
  prev.classList.toggle("opacity-30", current === 0);
  prev.classList.toggle("cursor-not-allowed", current === 0);

  // ANIMAÇÃO DE ENTRADA
  const box = document.getElementById("quiz-box");
  box.classList.remove("animate-fadeInUp");
  void box.offsetWidth; // força reflow para reiniciar animação
  box.classList.add("animate-fadeInUp");
}

// ---------------------------------------------
// 3. BOTÃO "PRÓXIMA"
// ---------------------------------------------
document.getElementById("btn-next").onclick = () => {
  const selected = document.querySelector("input[name='option']:checked");
  if (!selected) {
    alert("Selecione uma opção para continuar.");
    return;
  }

  answers[current] = selected.value;

  if (current < questions.length - 1) {
    current++;
    renderQuestion();
  } else {
    // FIM DO QUIZ
    localStorage.setItem("quizAnswers", JSON.stringify(answers));

    // animação de saída
    document.body.classList.add("animate-fadeOut");
    setTimeout(() => {
      window.location.href = "/resultado"; // rota do Express
    }, 350);
  }
};

// ---------------------------------------------
// 4. BOTÃO "ANTERIOR"
// ---------------------------------------------
document.getElementById("btn-prev").onclick = () => {
  if (current > 0) {
    current--;
    renderQuestion();
  }
};

// ---------------------------------------------
// 5. INICIALIZAÇÃO
// ---------------------------------------------
renderQuestion();
