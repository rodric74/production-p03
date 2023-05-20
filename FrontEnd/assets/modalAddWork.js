import{fetchCategories} from './data.js'

document.addEventListener('DOMContentLoaded', () => {
    const addWorkModal = document.querySelector('.modal-addWork-container');
    const deleteWorkModal = document.querySelector('.modal-delete-work-container');
    const closeButton = document.querySelector('.modal-addWork-container .close-modal-btn');
    const overlay = document.querySelector('.modal-addWork-container .overlay');
    const backButton = document.querySelector('.modal-addWork-container .arroback-btn');
   
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
  });
  