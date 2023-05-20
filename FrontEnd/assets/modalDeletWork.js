import {fetchWorks} from "./data.js";

// FERMETURE DE LA MODALE 
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.querySelector('.modal-delete-work-container');
    const closeModalButton = document.querySelector('.close-modal-btn');
    const overlay = document.querySelector('.overlay');
  
    closeModalButton.addEventListener('click', () => modal.style.display = "none");
    overlay.addEventListener('click', () => modal.style.display = "none");
  });

// AFFICHER LES WORKS EN VIGNETTE
document.addEventListener('DOMContentLoaded', async () => {
  const modalFigure = document.querySelector('.modal-delete-figure');

// Générer les vignettes des works dans la modal
async function thumbnails() {
  const works = await fetchWorks();
  modalFigure.innerHTML = works.map(work => `
    <figure class="work-item-modal">
      <img src="${work.imageUrl}" alt="${work.title}" />
      <img src="./assets/icons/trash.svg" alt="Supprimer l'oeuvre" id="delete-icon">
    </figure>
  `).join("");
}


  // Appeler la fonction pour générer les vignettes dans la modal
  await thumbnails();
});

