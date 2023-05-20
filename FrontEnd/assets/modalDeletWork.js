import {displayWorks} from "./index.js";

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.querySelector('.modal-delete-work-container');
    const closeModalButton = document.querySelector('.close-modal-btn');
    const overlay = document.querySelector('.overlay');
  
    closeModalButton.addEventListener('click', () => modal.style.display = "none");
    overlay.addEventListener('click', () => modal.style.display = "none");
  });
  