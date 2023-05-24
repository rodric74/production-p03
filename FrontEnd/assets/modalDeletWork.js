import { displayWorks } from './index.js';
import { fetchWorks } from './data.js';
// FERMETURE DE LA MODALE
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.querySelector('.modal-delete-work-container');
  const closeModalButton = document.querySelector('.close-modal-btn');
  const overlay = document.querySelector('.overlay');

  closeModalButton.addEventListener('click', () => (modal.style.display = 'none'));
  overlay.addEventListener('click', () => (modal.style.display = 'none'));
});

// AFFICHER LES WORKS EN VIGNETTE
// Générer les vignettes des works dans la modal
const modalFigure = document.querySelector('.modal-delete-figure');

export async function thumbnails() {
  const works = await fetchWorks();
  modalFigure.innerHTML = works
    .map(
      (work) => `
      <figure class="work-item-modal" data-id="${work.id}">
        <img src="${work.imageUrl}" alt="${work.title}" />
        <div class="overlay-image-container">
          <img id="overlay-image" src="./assets/icons/Frame.svg" alt="Frame" />
        </div>
        <img src="./assets/icons/trash.svg" alt="Supprimer l'oeuvre" id="delete-icon">
        <figcaption>éditer</figcaption>
      </figure>
    `
    )
    .join('');
  attachDeleteListeners();
}
   thumbnails();


// FONCTION POUR SUPPRESSION DES WORKS
async function deleteWork(id) {
  try {
    const response = await fetch(`http://localhost:5678/api/works/${id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/Json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    if (!response.ok) {
      throw new Error('Error while deleting work');
    }
  } catch (error) {
    console.error('Error during delete:', error);
  }
}


// DECLANCHER LA FONCTION DE SUPPRESSION
function attachDeleteListeners() {
  document.querySelectorAll('.work-item-modal #delete-icon').forEach((deleteIcon) => {
    deleteIcon.addEventListener('click', async (event) => {
      const workItem = event.target.closest('.work-item-modal');
      const workId = workItem.dataset.id;
      console.log("Deleting work with ID: ", workId);
      try {
        await deleteWork(workId);

        // Retirer l'élément de la page
        workItem.remove();

        // SUPP sur la page principale
        const mainPageWorkItem = document.querySelector(`#work-${workId}`);
        if (mainPageWorkItem) {
          mainPageWorkItem.remove();
        }

        // Mettre à jour l'affichage des works sur la page principale
        const works = await fetchWorks();
        displayWorks(works);
      } catch (error) {
        console.error('Failed to delete work:', error);
      }
    });
  });
}

//OUVERTURE DE MODALADDWORK
document.addEventListener('DOMContentLoaded', () => {
  const addWorkButton = document.querySelector('.modal-addwork-button');
  const addWorkModal = document.querySelector('.modal-addWork-container');
  const deleteWorkModal = document.querySelector('.modal-delete-work-container');
  const displayDiv = document.querySelector('.display-figure');
  const uploadForm = document.querySelector('.modal-addwork-form');
  const initialDiv = document.querySelector('.figure-initial');

  addWorkButton.addEventListener('click', () => {
    addWorkModal.style.display = 'flex';
    deleteWorkModal.style.display = 'none';
    displayDiv.innerHTML = ''; // Vider le contenu de la div d'affichage
    uploadForm.reset(); // reset du formulaire
    initialDiv.style.display = 'flex'; //affichage des inputs initiaux
  });
});
