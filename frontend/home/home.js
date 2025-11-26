document.getElementById("btn-start").addEventListener("click", () => {

    // Inicia animação de saída
    document.body.classList.add("animate-fadeOut");

    // Espera a animação terminar para mudar de página
    setTimeout(() => {
        window.location.href = "../login/login.html";
    }, 350);
});
