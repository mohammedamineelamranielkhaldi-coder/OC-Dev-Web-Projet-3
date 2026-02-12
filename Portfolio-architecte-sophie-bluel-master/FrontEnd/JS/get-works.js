// Liste globale des travaux
export let works = [];

// Récupère les travaux depuis l'API et met à jour "works"
export async function getWorks() {
    const response = await fetch("http://localhost:5678/api/works");
    works = await response.json();
    return works;
}

// Affiche les travaux dans la galerie principale
export function afficherWorks(filtreCategorieId = null) {
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = "";

    let worksAffiches = works;

    if (filtreCategorieId) {
        worksAffiches = works.filter(work => work.categoryId === filtreCategorieId);
    }

    worksAffiches.forEach(work => {
        const figure = document.createElement("figure");
        figure.dataset.id = work.id;

        const img = document.createElement("img");
        img.src = work.imageUrl;
        img.alt = work.title;

        const figcaption = document.createElement("figcaption");
        figcaption.textContent = work.title;

        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
    });
}