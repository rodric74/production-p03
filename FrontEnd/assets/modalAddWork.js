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
  const errorElement = document.querySelector('.modal-addwork-error');
  let selectedFile = null;

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
    <option value=""></option>
    ${options.join('')}
  `;

  // GESTION AJOUT IMAGE
  // Création d'un nouvel élément input de type file
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = '.png, .jpg, .jpeg';

  fileInput.addEventListener('change', (event) => {
    // Récupération du fichier sélectionné
    const file = event.target.files[0];

    // Vérification de la taille du fichier
    if (file && file.size <= 4 * 1024 * 1024) {
      selectedFile = file; // Définir selectedFile seulement si le fichier est valide

      const imageURL = URL.createObjectURL(selectedFile); // Création de l'URL objet pour l'image

      const imgElement = document.createElement('img'); // Création d'un élément img
      imgElement.onload = function () {
        URL.revokeObjectURL(imageURL); // L'image est chargée, on révoque l'URL Blob
      };
      imgElement.src = imageURL; // Attribution de l'URL objet comme source de l'image
      displayDiv.appendChild(imgElement); // Ajout de l'élément img à la div d'affichage
      initialDiv.style.display = 'none'; // Masquage de la div initiale
    } else {
      console.error('Le fichier sélectionné dépasse la taille maximale autorisée de 4 Mo.');
      errorElement.textContent = 'Sélectionnez un fichier de 4 Mo MAX';
    }

    checkValidationConditions(); // Vérification des conditions pour activer le bouton de validation
  });

  uploadButton.addEventListener('click', (event) => {
    event.stopPropagation();

    fileInput.click();
  });

 // Gestion du titre et de la catégorie
  titleInput.addEventListener('input', checkValidationConditions);
  categorieInput.addEventListener('change', checkValidationConditions);

  function checkValidationConditions() {
    if (titleInput.value.trim() !== '' && categorieInput.value !== '' && selectedFile) {
      validateButton.disabled = false;
      validateButton.classList.add('validate-button-enabled');
    } else {
      validateButton.disabled = true;
      validateButton.classList.remove('validate-button-enabled');
    }
  }
});
