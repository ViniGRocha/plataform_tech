// Bloqueia acesso sem login
if (!localStorage.getItem("user")) {
    window.location.href = "../login/login.html";
}

// Pega respostas
const answers = JSON.parse(localStorage.getItem("quizAnswers"));
if (!answers) {
    window.location.href = "../quiz/quiz.html";
}

// Contadores
let scores = { front: 0, back: 0, data: 0, infra: 0 };

// Mapeamento das respostas
const map = {
    ux_ui: "front",
    backend: "back",
    data_ia: "data",
    infra: "infra",

    design: "front",
    apis: "back",
    ia: "data",
    servidores: "infra",

    interfaces: "front",
    sistemas: "back",
    previsao: "data",
    infra_cloud: "infra",

    front: "front",
    backend: "back",
    data: "data",
    infra2: "infra",

    visual: "front",
    logica: "back",
    insights: "data",
    seguranca: "infra",

    criativo: "front",
    codando: "back",
    dados: "data",
    sistemas: "infra"
};

// Soma
Object.values(answers).forEach(r => { if (map[r]) scores[map[r]]++; });

let trilha = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);

// Banco de dados das trilhas
const trilhas = {
    front: {
        titulo: "Desenvolvedor Front-End",
        descricao: "Você tem talento para criar interfaces visuais incríveis! O Front-End é perfeito para quem gosta de ver resultados visuais e trabalhar com criatividade e código.",
        salario: "R$ 4.000 - R$ 12.000",
        demanda: "Muito Alta",
        demandaCor: "bg-purple-600",
        habilidades: ["HTML5", "CSS3", "JavaScript", "React/Vue/Angular", "UI/UX Design", "Responsive Design"],
        tecnologias: ["React.js", "TypeScript", "Tailwind CSS", "Next.js", "Figma", "Git"],
        passos: [
            "Dominar HTML, CSS e JavaScript básico",
            "Aprender um framework moderno (React recomendado)",
            "Estudar TypeScript e boas práticas",
            "Praticar com projetos pessoais",
            "Aprender sobre performance e acessibilidade"
        ]
    },

    back: {
        titulo: "Desenvolvedor Back-End",
        descricao: "Você gosta de lógica, sistemas e resolver problemas complexos. O Back-End é ideal para quem quer construir APIs robustas e arquiteturas escaláveis.",
        salario: "R$ 5.000 - R$ 12.000",
        demanda: "Alta",
        demandaCor: "bg-green-600",
        habilidades: ["Lógica de Programação", "APIs REST", "SQL/NoSQL", "Arquitetura de Sistemas"],
        tecnologias: ["Node.js", "Java", "Python", "Docker", "PostgreSQL", "AWS"],
        passos: [
            "Aprender programação back-end (Node, Java ou Python)",
            "Entender bancos de dados",
            "Construir APIs e microserviços",
            "Aprender Docker e versionamento",
            "Estudar arquitetura e escalabilidade"
        ]
    },

    data: {
        titulo: "Analista de Dados & IA",
        descricao: "Você é curioso e analítico. A área de dados é perfeita para quem gosta de entender padrões e criar modelos inteligentes.",
        salario: "R$ 6.000 - R$ 18.000",
        demanda: "Muito Alta",
        demandaCor: "bg-blue-600",
        habilidades: ["Python", "Estatística", "Machine Learning", "Visualização de Dados"],
        tecnologias: ["Python", "Pandas", "Scikit-Learn", "TensorFlow", "SQL", "Power BI"],
        passos: [
            "Aprender Python e lógica de dados",
            "Estudar estatística e matemática aplicada",
            "Aprender visualização (Power BI, Looker)",
            "Estudar Machine Learning com Python",
            "Criar projetos de predição e IA"
        ]
    },

    infra: {
        titulo: "DevOps & Infraestrutura",
        descricao: "Você gosta de estabilidade, automação e servidores. A área de infraestrutura é essencial em qualquer empresa moderna.",
        salario: "R$ 5.000 - R$ 15.000",
        demanda: "Alta",
        demandaCor: "bg-red-600",
        habilidades: ["Linux", "Redes", "Segurança", "Automação"],
        tecnologias: ["AWS", "Docker", "Kubernetes", "Terraform", "Linux", "CI/CD"],
        passos: [
            "Aprender Linux e redes básicas",
            "Estudar containers e Docker",
            "Aprender Kubernetes e orquestração",
            "Trabalhar com Cloud (AWS/Azure)",
            "Aprender automação e CI/CD"
        ]
    }
};

// Renderização no HTML
const t = trilhas[trilha];

document.getElementById("titulo-trilha").innerText = t.titulo;
document.getElementById("descricao-trilha").innerText = t.descricao;
document.getElementById("faixa-salarial").innerText = t.salario;

const demandaLabel = document.getElementById("demanda");
demandaLabel.innerText = t.demanda;
demandaLabel.classList.add(t.demandaCor);

// Render habilidades
t.habilidades.forEach(h => {
    document.getElementById("habilidades").innerHTML += `
        <span class="px-3 py-1 bg-purple-soft text-tech-primary rounded-full text-sm">${h}</span>
    `;
});

// Render tecnologias
t.tecnologias.forEach(tec => {
    document.getElementById("tecnologias").innerHTML += `
        <span class="px-3 py-1 bg-purple-soft text-purple-800 rounded-full text-sm">${tec}</span>
    `;
});

// Render passos
t.passos.forEach((p, i) => {
    document.getElementById("trilha-passos").innerHTML += `
        <li class="flex items-start gap-3">
            <span class="bg-tech-primary text-white px-3 py-1 rounded-full font-bold">${i + 1}</span>
            <p>${p}</p>
        </li>
    `;
});

// Logout
function logout() {
    localStorage.removeItem("user");

    // animação suave de saída (se quiser manter o padrão)
    document.body.classList.add("animate-fadeOut");

    setTimeout(() => {
        window.location.href = "../home/home.html";
    }, 350);
}

