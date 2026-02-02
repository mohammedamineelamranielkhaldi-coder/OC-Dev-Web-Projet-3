import { afficherWorks } from "./JS/get-works.js";

afficherWorks();


import { afficherCategories } from "./JS/filter.js";

afficherCategories();

// Vérifie si l'utilisateur est connecté
const token = localStorage.getItem("token");

if (token) {
    // Affiche le bandeau noir
    document.getElementById("edit-banner").style.display = "block";

    // Affiche le bouton modifier
    document.getElementById("edit-button").style.display = "inline-block";

    // Affiche logout, cache login
document.querySelector(".li-login").style.display = "none";
    document.getElementById("logout-link").style.display = "inline";

    // Cache les filtres
    const filters = document.querySelector(".filters");
    if (filters) {
        filters.style.display = "none";
    }

    // Fonction de déconnexion
    document.getElementById("logout-link").addEventListener("click", function () {
        localStorage.removeItem("token");
        window.location.reload();
    });
}