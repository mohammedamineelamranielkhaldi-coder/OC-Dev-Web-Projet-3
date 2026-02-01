import { afficherWorks } from "./get-works.js";

// Part add div for filters + button Tous

const portfolioSection = document.querySelector("#portfolio");
const divFilters = document.createElement("div");

divFilters.classList.add("filters");
portfolioSection.insertBefore(divFilters, portfolioSection.querySelector(".gallery"));
const buttonTous = document.createElement("button");
buttonTous.textContent = "Tous";   
buttonTous.classList.add("button");
divFilters.appendChild(buttonTous);

buttonTous.addEventListener("click", () => {
    afficherWorks();
});

// Part button from API

export function afficherCategories() {
    fetch("http://localhost:5678/api/categories")
        .then(response => response.json())
        .then(data => {

            const divFilters = document.querySelector(".filters");

            data.forEach(category => {
                 const button = document.createElement("button");
                 button.classList.add("filters-button");
                 button.textContent = category.name;

                 button.addEventListener("click", () => {
                     afficherWorks(category.id);
                 });

                 divFilters.appendChild(button);
            });

        });
}