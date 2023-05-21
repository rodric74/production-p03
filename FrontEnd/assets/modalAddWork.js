import { fetchCategories } from './data.js';

document.addEventListener('DOMContentLoaded', async () => {
  const addWorkModal = document.querySelector('.modal-addWork-container');
  const deleteWorkModal = document.querySelector('.modal-delete-work-container');
  const closeButton = document.querySelector('.modal-addWork-container .close-modal-btn');
  const overlay = document.querySelector('.modal-addWork-container .overlay');
  const backButton = document.querySelector('.modal-addWork-container .arroback-btn');
  const categorieInput = document.querySelector('.modal-addwork-categorie');
  const uploadButton = document.getElementById('uploadButton');
  const displayDiv = document.querySelector('.display-figure');
  const initialDiv = document.querySelector('.figure-initial');
  const validateButton = document.querySelector('.modal-addwork-validate');
  const titleInput = document.querySelector('.modal-addwork-title-figure');

  // FERMETURE MODALE - Retour delete modale
  const closeAddWorkModal = () => {
    addWorkModal.style.display = 'none';
  };

  backButton.addEventListener('click', () => {
    closeAddWorkModal();
    deleteWorkModal.style.display = 'flex';
  });

  closeButton.addEventListener('click', closeAddWorkModal);
  overlay.addEventListener('click', closeAddWorkModal);

  // GESTION CATEGORIES DANS INPUT
  const categories = await fetchCategories();

  // Générer les options des catégories
  const options = categories.map((category) => `
    <option value="${category.id}">${category.name}</option>
  `);

  // Ajouter les options au champ de sélection
  categorieInput.innerHTML = `
    <option value=""></option>
    ${options.join('')}
  `;

  // Gestion du titre et de la catégorie
  titleInput.addEventListener('input', checkValidationConditions);
  categorieInput.addEventListener('change', checkValidationConditions);

 //AJOUT IMAGE 
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = '.png, .jpg, .jpeg';

  fileInput.addEventListener('change', (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.size <= 4 * 1024 * 1024) {
      const imageURL = URL.createObjectURL(selectedFile);

      const imgElement = document.createElement('img');
      imgElement.onload = function () {
        URL.revokeObjectURL(imageURL);
      };
      imgElement.src = imageURL;
      displayDiv.appendChild(imgElement);
      initialDiv.style.display = 'none';

      checkValidationConditions(); // Vérifier les conditions pour activer le bouton de validation
    } else {
      console.log('Le fichier sélectionné dépasse la taille maximale autorisée de 4 Mo.');
      const errorElement = document.querySelector('.modal-addwork-error');
      errorElement.textContent = 'Sélectionnez un fichier de 4 Mo MAX';
    }
  });

  uploadButton.addEventListener('click', () => {
    fileInput.value = null;
    fileInput.click();
  });

  // CONDITIONS DE VALIDATION
  function checkValidationConditions() {
    if (titleInput.value.trim() !== '' && categorieInput.value !== '') {
      validateButton.disabled = false;
      validateButton.style.backgroundColor = '#1D6154';
    } else {
      validateButton.disabled = true;
      validateButton.style.backgroundColor = '';
    }
  }
});
