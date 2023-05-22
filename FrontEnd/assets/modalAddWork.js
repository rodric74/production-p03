import { fetchCategories, fetchWorks } from './data.js';
import {displayWorks} from './index.js';
import {thumbnails} from './modalDeletWork.js'

document.addEventListener('DOMContentLoaded', async () => {
  const addWorkModal = document.querySelector('.modal-addWork-container');
  const deleteWorkModal = document.querySelector('.modal-delete-work-container');
  const closeButton = document.querySelector('.modal-addWork-container .close-modal-btn');
  const overlay = document.querySelector('.modal-addWork-container .overlay');
  const backButton = document.querySelector('.modal-addWork-container .arroback-btn');
  const categorieInput = document.querySelector('.modal-addwork-categorie');
  const fileInput = document.querySelector('#add-image');
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

  // uploadButton.addEventListener('click', () => {
  //   event.stopPropagation();
  //    fileInput.click();
  // });

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

//Envoyer le work au back-end
validateButton.addEventListener('click', async (event) => {
  event.preventDefault(); 

  // Créer un objet FormData et y ajouter les données du formulaire
  const formData = new FormData();
  formData.append('title', titleInput.value);
  formData.append('category', categorieInput.value);
  formData.append('image', selectedFile); // Ajouter le fichier sélectionné

  // Récupérer le token de l'utilisateur
  const userToken = localStorage.getItem('token');

  // Envoyer les données au back-end
  const response = await fetch('http://localhost:5678/api/works', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + userToken,
    },
    body: formData,
  });

  // Vérifier la réponse
  if (response.ok) {
    console.log('Work envoyé avec succès');
    // Fermer la modale et revenir à la page principale
    closeAddWorkModal();
  
    // Récupérer à nouveau toutes les données de travail
    const works = await fetchWorks();
  
    // Afficher les données de travail
    displayWorks(works);
  
    // Mettre à jour les vignettes dans la modale de suppression
    thumbnails();
  } else {
    console.error('Erreur lors de l\'envoi du travail:', response.statusText);
  }
});
});

