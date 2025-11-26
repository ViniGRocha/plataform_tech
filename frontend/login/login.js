// Botão de login
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    if (!email || !senha) {
        alert("Preencha todos os campos!");
        return;
    }

    // Simula login
    localStorage.setItem("user", JSON.stringify({ email }));

    // Animação suave antes de ir para o quiz
    document.body.classList.add("animate-fadeOut");

    setTimeout(() => {
        window.location.href = "/quiz";
    }, 350);
});


// 💜 Efeito para ir para tela de registro
document.getElementById("go-register").addEventListener("click", () => {
    document.body.classList.add("animate-fadeOut");

    setTimeout(() => {
        window.location.href = "/quiz";
    }, 350);
});

