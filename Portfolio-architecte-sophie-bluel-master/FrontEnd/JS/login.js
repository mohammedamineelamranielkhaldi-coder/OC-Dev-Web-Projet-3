const form = document.getElementById("login-form");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const loginData = {
        email: email,
        password: password
    };

    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData)
    })
    .then(response => {
        if (!response.ok) {
            // 401 ou 404 → erreur
            throw new Error("Identifiants incorrects");
        }
        return response.json();
    })
    .then(data => {
        localStorage.setItem("token", data.token);
        window.location.href = "http://127.0.0.1:5500/Portfolio-architecte-sophie-bluel-master/FrontEnd/index.html";
    })
    .catch(error => {
        const errorMessage = document.getElementById("error-message");
        errorMessage.textContent = "Erreur dans l’identifiant ou le mot de passe";
        errorMessage.style.color = "red";
    });
});