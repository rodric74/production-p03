import{fetchCategories} from './data.js'

document.addEventListener('DOMContentLoaded', async () => {
    const addWorkModal = document.querySelector('.modal-addWork-container');
    const deleteWorkModal = document.querySelector('.modal-delete-work-container');
    const closeButton = document.querySelector('.modal-addWork-container .close-modal-btn');
    const overlay = document.querySelector('.modal-addWork-container .overlay');
    const backButton = document.querySelector('.modal-addWork-container .arroback-btn');
    const categorieInput = document.querySelector('.modal-addwork-categorie');

    //FERMETURE MODALE
    const closeAddWorkModal = () => {
      addWorkModal.style.display = 'none';
    };
    //RETOUR DELETE MODALE
    backButton.addEventListener('click', () => {
      closeAddWorkModal();
      deleteWorkModal.style.display = 'flex';
    });
  
    closeButton.addEventListener('click', closeAddWorkModal);
    overlay.addEventListener('click', closeAddWorkModal);

    // Récupérer les catégories
    const categories = await fetchCategories();

    // Générer les options des catégories
    const options = categories.map((category) => `
        <option value="${category.id}">${category.name}</option>
    `);

    // Ajouter les options au champ de sélection
    categorieInput.innerHTML = `
        <option value=""</option>
        ${options.join('')}
    `;
});
  