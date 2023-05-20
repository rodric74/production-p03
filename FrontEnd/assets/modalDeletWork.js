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
document.addEventListener('DOMContentLoaded', async () => {
  const modalFigure = document.querySelector('.modal-delete-figure');

  // Générer les vignettes des works dans la modal
  async function thumbnails() {
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
        </figure>
      `
      )
      .join('');
    // Ajoutez les écouteurs d'événements après avoir créé les vignettes
    attachDeleteListeners();
  }

  // Appeler la fonction pour générer les vignettes dans la modal
  await thumbnails();
});

// FONCTION POUR SUPPRESSION DES WORKS
async function deleteWork(id) {
  const token = localStorage.getItem('token');
  const response = await fetch(`http://localhost:5678/api/works/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: '*/*',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Error while deleting work');
  }
}

// DECLANCHER LA FONCTION DE SUPPRESSION
function attachDeleteListeners() {
  document.querySelectorAll('.work-item-modal #delete-icon').forEach((deleteIcon) => {
    deleteIcon.addEventListener('click', async (event) => {
      const workItem = event.target.closest('.work-item-modal');
      const workId = workItem.dataset.id;
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