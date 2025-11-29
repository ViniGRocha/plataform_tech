document.getElementById("registerForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const confirmar = document.getElementById("confirmar-senha").value;

    if (!nome || !email || !senha || !confirmar) {
        alert("Preencha todos os campos!");
        return;
    }

    if (senha !== confirmar) {
        alert("As senhas não coincidem!");
        return;
    }

    // 🔥 Enviar para o backend
    try {
        const response = await fetch("http://localhost:3000/api/usuarios", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nome, email, senha })
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message || "Erro ao criar conta");
            return;
        }

        // 🎉 Sucesso → Mostrar mensagem elegante
        const msgBox = document.getElementById("success-message");
        msgBox.classList.remove("hidden");
        msgBox.classList.add("animate-fadeIn");

        msgBox.querySelector("p").innerText = "Conta criada com sucesso! Redirecionando...";

        setTimeout(() => {
            document.body.classList.add("animate-fadeOut");
            setTimeout(() => {
                window.location.href = "/login";
            }, 350);
        }, 1200);

    } catch (error) {
        console.error("Erro:", error);
        alert("Erro ao conectar ao servidor");
    }
});
