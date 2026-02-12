// IMPORTS PRINCIPAUX

import { getWorks, afficherWorks } from "./JS/get-works.js";
import { afficherCategories } from "./JS/filter.js";
import "./JS/modal.js";


// INITIALISATION DES FILTRES

function initFiltres() {
    const btnTous = document.querySelector('[data-filter="all"]');
    const btnObjets = document.querySelector('[data-filter="1"]');
    const btnAppartements = document.querySelector('[data-filter="2"]');
    const btnHotels = document.querySelector('[data-filter="3"]');

    if (btnTous) {
        btnTous.addEventListener("click", () => afficherWorks(null));
        btnObjets.addEventListener("click", () => afficherWorks(1));
        btnAppartements.addEventListener("click", () => afficherWorks(2));
        btnHotels.addEventListener("click", () => afficherWorks(3));
    }
}


// INITIALISATION GLOBALE

async function init() {
    await getWorks();     // Charge les works depuis l'API
    afficherWorks();      // Affiche la galerie principale
    initFiltres();        // Active les filtres
    afficherCategories(); // Affiche les catégories dans les boutons
}

init();


// GESTION LOGIN / LOGOUT + MODE ÉDITION
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

} else {
    // cacher logout
    document.querySelector(".li-logout").style.display = "none";

    // Afficher login
    document.querySelector(".li-login").style.display = "block";
    document.getElementById("login-link").style.display = "inline";
}