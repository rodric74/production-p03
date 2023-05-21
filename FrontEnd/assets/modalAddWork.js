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
    
  //GESTION AJOUT IMAGE
    uploadButton.addEventListener('click', () => {
      // Création d'un nouvel élément input de type file
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = '.png, .jpg, .jpeg';

    fileInput.addEventListener('change', (event) => {
      const selectedFile = event.target.files[0]; // Récupération du fichier sélectionné
      // Vérification de la taille du fichier
      if (selectedFile && selectedFile.size <= 4 * 1024 * 1024) {
        const imageURL = URL.createObjectURL(selectedFile); // Création de l'URL objet pour l'image

        const imgElement = document.createElement('img'); // Création d'un élément img
        imgElement.onload = function() {
          URL.revokeObjectURL(imageURL); // L'image est chargée, on revoque l'URL Blob
        };
        imgElement.src = imageURL; // Attribution de l'URL objet comme source de l'image
        displayDiv.appendChild(imgElement); // Ajout de l'élément img à la div d'affichage
        initialDiv.style.display = 'none'; // Masquage de la div initiale
      } else {
        console.log('Le fichier sélectionné dépasse la taille maximale autorisée de 4 Mo.');
        const errorElement = document.querySelector('.modal-addwork-error');
        errorElement.textContent = 'Sélectionnez un fichier de 4mo MAX';
      }
    });

    fileInput.value = null; // Réinitialiser la valeur de l'input file
    fileInput.click();
  });
});
