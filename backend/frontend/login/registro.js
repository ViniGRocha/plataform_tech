// Envio do formulário de registro
document.getElementById("registerForm").addEventListener("submit", function (e) {
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

    // Exibir mensagem elegante
    const msgBox = document.getElementById("success-message");
    msgBox.classList.remove("hidden");
    msgBox.classList.add("animate-fadeIn");

    msgBox.querySelector("p").innerText = "Conta criada com sucesso! Redirecionando...";

    // Animação e transição
    setTimeout(() => {
        document.body.classList.add("animate-fadeOut");
        setTimeout(() => {
            window.location.href = "login.html";
        }, 350);
    }, 1200); // tempo da mensagem antes da saída
});


// 🔄 Efeito suave: registro → login
document.getElementById("go-login").addEventListener("click", () => {
    document.body.classList.add("animate-fadeOut");

    setTimeout(() => {
        window.location.href = "login.html";
    }, 350);
});
