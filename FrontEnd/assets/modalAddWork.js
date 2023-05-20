//ARROBACK RETOUR MODAL DELETE
document.addEventListener('DOMContentLoaded', () => {
    const backButton = document.querySelector('.modal-addWork-container .arroback-btn');
    const addWorkModal = document.querySelector('.modal-addWork-container');
    const deleteWorkModal = document.querySelector('.modal-delete-work-container');
  
    backButton.addEventListener('click', () => {
      addWorkModal.style.display = 'none';
      deleteWorkModal.style.display = 'flex';
    });
  });

  //FERMETURE MODALE
  document.addEventListener('DOMContentLoaded', () => {
    const closeButton = document.querySelector('.modal-addWork-container .close-modal-btn');
    const addWorkModal = document.querySelector('.modal-addWork-container');
  
    closeButton.addEventListener('click', () => {
      addWorkModal.style.display = 'none';
    });
  });

  