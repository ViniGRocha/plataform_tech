document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    const response = await fetch('/api/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
    });

    const data = await response.json();

    if (!response.ok) {
        alert(data.message || "Login inválido");
        return;
    }

    // Salvando dados no navegador
    localStorage.setItem("user", JSON.stringify(data.user));

    // Animação antes de ir para a HOME
    document.body.classList.add("animate-fadeOut");

    setTimeout(() => {
        window.location.href = "/quiz"; // ou /home
    }, 350);
});
