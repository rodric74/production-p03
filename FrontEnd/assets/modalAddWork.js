import{fetchCategories} from './data.js'

document.addEventListener('DOMContentLoaded', async () => {
    const addWorkModal = document.querySelector('.modal-addWork-container');
    const deleteWorkModal = document.querySelector('.modal-delete-work-container');
    const closeButton = document.querySelector('.modal-addWork-container .close-modal-btn');
    const overlay = document.querySelector('.modal-addWork-container .overlay');
    const backButton = document.querySelector('.modal-addWork-container .arroback-btn');
    const categorieInput = document.querySelector('.modal-addwork-categorie');

    //FERMETURE MODALE - RETOUR DELETE MODALE
    const closeAddWorkModal = () => {
      addWorkModal.style.display = 'none';
    };

    backButton.addEventListener('click', () => {
      closeAddWorkModal();
      deleteWorkModal.style.display = 'flex';
    });
  
    closeButton.addEventListener('click', closeAddWorkModal);
    overlay.addEventListener('click', closeAddWorkModal);

    // GESTION DES CATEGORIES
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
  
//SELECTION DE FICHIER 
const uploadButton = document.getElementById('uploadButton');
const displayDiv = document.querySelector('.display-figure');
const initialDiv = document.querySelector('.figure-initial');

uploadButton.addEventListener('click', () => {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = '.png, .jpg, .jpeg';

  fileInput.addEventListener('change', (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.size <= 4 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onload = function () {
        const imgElement = document.createElement('img');
        imgElement.src = reader.result;
        displayDiv.appendChild(imgElement);
        initialDiv.style.display = 'none';
      };
      reader.readAsDataURL(selectedFile);
    } else {
      console.log('Le fichier sélectionné dépasse la taille maximale autorisée de 4 Mo.');
    }
  });

  fileInput.click();
});
