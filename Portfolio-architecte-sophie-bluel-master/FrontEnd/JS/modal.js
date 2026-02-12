// OUVERTURE / FERMETURE DE LA MODALE

const editButton = document.getElementById("edit-button");
const modalOverlay = document.getElementById("modal-overlay");

// Ouvrir la modale
editButton.addEventListener("click", () => {
    modalOverlay.style.display = "flex";
    afficherWorksDansModale(); // Charge la galerie dans la modale
});

// Fermer avec la croix
document.querySelector(".close-modal").addEventListener("click", () => {
    modalOverlay.style.display = "none";
});

// Fermer en cliquant sur l’overlay
modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.style.display = "none";
    }
});

// SWITCH ENTRE GALERIE ET FORMULAIRE

// Aller vers le formulaire
document.getElementById("open-add-photo").addEventListener("click", () => {
    document.getElementById("modal-gallery-view").style.display = "none";
    document.getElementById("modal-add-view").style.display = "block";
    chargerCategories(); // Charge les catégories depuis l'API
});

// Retour à la galerie
document.querySelector(".back-to-gallery").addEventListener("click", () => {
    document.getElementById("modal-add-view").style.display = "none";
    document.getElementById("modal-gallery-view").style.display = "block";
});

// IMPORT DES WORKS

import { getWorks, afficherWorks } from "./get-works.js";

// AFFICHAGE DES WORKS DANS LA MODALE

async function afficherWorksDansModale() {
    const works = await getWorks();
    const modalGallery = document.querySelector(".modal-gallery");
    modalGallery.innerHTML = "";

    works.forEach(work => {
        const figure = document.createElement("figure");
        figure.dataset.id = work.id;

        const img = document.createElement("img");
        img.src = work.imageUrl;

        const trash = document.createElement("i");
        trash.classList.add("fa-solid", "fa-trash-can", "trash-icon");

        trash.addEventListener("click", () => supprimerWork(work.id, figure));

        figure.appendChild(img);
        figure.appendChild(trash);
        modalGallery.appendChild(figure);
    });
}

// SUPPRESSION D’UN WORK

async function supprimerWork(id, figureElement) {
    const token = localStorage.getItem("token");

    const response = await fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (response.ok) {
        figureElement.remove(); // Supprime dans la modale
        document.querySelector(`.gallery figure[data-id="${id}"]`)?.remove(); // Supprime dans la galerie principale

        // Synchronisation automatique
        await getWorks();
        afficherWorks();
        afficherWorksDansModale();
    }
}

// CHARGER LES CATÉGORIES DANS LE FORMULAIRE

async function chargerCategories() {
    const response = await fetch("http://localhost:5678/api/categories");
    const categories = await response.json();

    const select = document.getElementById("category");
    select.innerHTML = "";

    categories.forEach(cat => {
        const option = document.createElement("option");
        option.value = cat.id;
        option.textContent = cat.name;
        select.appendChild(option);
    });
}

// PREVIEW DE L’IMAGE + ANNULATION

const fileInput = document.getElementById("photo-upload");
const previewWrapper = document.querySelector(".preview-wrapper");
const preview = document.getElementById("preview-image");
const uploadZone = document.querySelector(".upload-zone");
const removePreview = document.getElementById("remove-preview");

fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        preview.src = e.target.result;
        previewWrapper.style.display = "block";
        uploadZone.style.display = "none";
        verifierFormulaire();
    };
    reader.readAsDataURL(file);
});

// Bouton pour retirer la preview
removePreview.addEventListener("click", () => {
    previewWrapper.style.display = "none";
    uploadZone.style.display = "flex";
    fileInput.value = "";
    verifierFormulaire();
});

// VALIDATION DU FORMULAIRE

const titleInput = document.getElementById("title");
const categorySelect = document.getElementById("category");
const validateBtn = document.getElementById("validate-btn");

function verifierFormulaire() {
    if (fileInput.files.length > 0 && titleInput.value.trim() !== "" && categorySelect.value !== "") {
        validateBtn.classList.add("active");
        validateBtn.disabled = false;
    } else {
        validateBtn.classList.remove("active");
        validateBtn.disabled = true;
    }
}

fileInput.addEventListener("change", verifierFormulaire);
titleInput.addEventListener("input", verifierFormulaire);
categorySelect.addEventListener("change", verifierFormulaire);

// ENVOI DU FORMULAIRE À L’API

const form = document.getElementById("add-photo-form");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) return;

    const formData = new FormData();
    formData.append("image", fileInput.files[0]);
    formData.append("title", titleInput.value);
    formData.append("category", categorySelect.value);

    const response = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    });

    if (response.ok) {
        const newWork = await response.json();

        ajouterWorkDansGalerie(newWork); // Ajoute dans la galerie principale
        afficherWorksDansModale(); // Rafraîchit la modale

        // Synchronisation automatique (3.3)
        await getWorks();
        afficherWorks();
        afficherWorksDansModale();

        // Reset du formulaire
        form.reset();
        previewWrapper.style.display = "none";
        uploadZone.style.display = "flex";
        validateBtn.classList.remove("active");
        validateBtn.disabled = true;

        // Retour à la galerie
        document.getElementById("modal-add-view").style.display = "none";
        document.getElementById("modal-gallery-view").style.display = "block";
    } else {
        alert("Erreur lors de l’envoi du projet");
    }
});

// AJOUT DANS LA GALERIE PRINCIPALE

function ajouterWorkDansGalerie(work) {
    const gallery = document.querySelector(".gallery");

    const figure = document.createElement("figure");
    figure.dataset.id = work.id;

    const img = document.createElement("img");
    img.src = work.imageUrl;

    const figcaption = document.createElement("figcaption");
    figcaption.textContent = work.title;

    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
}