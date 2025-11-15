import { Request, Response } from "express";

export const chatBot = async (req: Request, res: Response) => {
    const { conversation } = req.body;

    try {
        const respostas = conversation.map((r: string) => r.toLowerCase());

        let pontos = {
            design: 0,
            programacao: 0,
            dados: 0,
            infraestrutura: 0,
            automacao: 0
        };

        // ======== Análise inteligente ========
        respostas.forEach((r: string) => {

            // DESIGN / UX
            if (
                r.includes("design") ||
                r.includes("visual") ||
                r.includes("experiência") ||
                r.includes("ux") ||
                r.includes("criatividade")
            ) pontos.design++;

            // PROGRAMAÇÃO / DEV
            if (
                r.includes("programação") ||
                r.includes("código") ||
                r.includes("lógica") ||
                r.includes("backend") ||
                r.includes("frontend")
            ) pontos.programacao++;

            // DADOS / DATA SCIENCE
            if (
                r.includes("dados") ||
                r.includes("análise") ||
                r.includes("estatística") ||
                r.includes("data")
            ) pontos.dados++;

            // INFRA / DEVOPS
            if (
                r.includes("servidor") ||
                r.includes("infraestrutura") ||
                r.includes("rede") ||
                r.includes("hardware") ||
                r.includes("bastidores")
            ) pontos.infraestrutura++;

            // AUTOMAÇÃO / RPA
            if (
                r.includes("automação") ||
                r.includes("processos") ||
                r.includes("rpa")
            ) pontos.automacao++;
        });

        // ==== Encontrar maior pontuação ====
        const maiorPontuacao = Math.max(...Object.values(pontos));

        // Se tudo foi zero → não conseguiu entender
        if (maiorPontuacao === 0) {
            return res.json({
                reply: "Não consegui identificar claramente sua trilha. Tente responder usando palavras como: design, código, dados, automação ou servidores."
            });
        }

        // Captura trilhas com pontuação máxima (pode ter empate!)
        const trilhasFortes = Object.entries(pontos)
            .filter(([_, valor]) => valor === maiorPontuacao)
            .map(([chave]) => chave);

        const nomesTrilhas: any = {
            design: "Design / UX",
            programacao: "Programação",
            dados: "Dados / Data Science",
            infraestrutura: "Infraestrutura / DevOps",
            automacao: "Automação / RPA"
        };

        const listaFinal = trilhasFortes.map(t => nomesTrilhas[t]).join(", ");

        return res.json({
            reply:
                `Sua trilha ideal é: **${listaFinal}**\n\n` +
                `Com base nas suas respostas, você demonstrou maior afinidade com essas áreas.`
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ reply: "Erro ao processar." });
    }
};
