import { fetchCategories, fetchWorks } from "./data.js";
import { displayWorks } from "./index.js";
import { thumbnails } from "./modalDeletWork.js";

document.addEventListener("DOMContentLoaded", async () => {
  const addWorkModal = document.querySelector(".modal-addWork-container");
  const deleteWorkModal = document.querySelector(
    ".modal-delete-work-container"
  );
  const closeButton = document.querySelector(
    ".modal-addWork-container .close-modal-btn"
  );
  const overlay = document.querySelector(".modal-addWork-container .overlay");
  const backButton = document.querySelector(
    ".modal-addWork-container .arroback-btn"
  );
  const categorieInput = document.querySelector(".modal-addwork-categorie");
  const fileInput = document.querySelector("#add-image");
  const displayDiv = document.querySelector(".display-figure");
  const initialDiv = document.querySelector(".figure-initial");
  const validateButton = document.querySelector(".modal-addwork-validate");
  const titleInput = document.querySelector(".modal-addwork-title-figure");
  const errorElement = document.querySelector(".modal-addwork-error");
  const formMessage = document.querySelector("#fill-the-field");

  let selectedFile = null;

  const closeAddWorkModal = () => {
    addWorkModal.style.display = "none";
    validateButton.disabled = true;
    validateButton.classList.remove("validate-button-enabled");
  };

  backButton.addEventListener("click", () => {
    closeAddWorkModal();
    deleteWorkModal.style.display = "flex";
  });

  closeButton.addEventListener("click", closeAddWorkModal);
  overlay.addEventListener("click", closeAddWorkModal);

  const categories = await fetchCategories();

  const options = categories.map(
    (category) => `
    <option value="${category.id}">${category.name}</option>
  `
  );

  categorieInput.innerHTML = `
    <option value=""></option>
    ${options.join("")}
  `;
  let isFileSizeValid = false;

  fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];

    if (file && file.size <= 4 * 1024 * 1024) {
      selectedFile = file;
      isFileSizeValid = true;

      const imageURL = URL.createObjectURL(selectedFile);

      const imgElement = document.createElement("img");
      imgElement.onload = function () {
        URL.revokeObjectURL(imageURL);
      };
      imgElement.src = imageURL;
      displayDiv.appendChild(imgElement);
      initialDiv.style.display = "none";
      formMessage.textContent = "";
    } else {
      console.error(
        "Le fichier sélectionné dépasse la taille maximale autorisée de 4 Mo."
      );
      formMessage.textContent = "Sélectionnez un fichier de 4 Mo MAX";
      isFileSizeValid = false;
    }
    checkValidationConditions();

    fileInput.addEventListener("click", () => {
      formMessage.textContent = "";
    });
  });

  titleInput.addEventListener("input", checkValidationConditions);
  categorieInput.addEventListener("change", checkValidationConditions);
  fileInput.addEventListener("change", checkValidationConditions);

  function checkValidationConditions() {
    if (
      titleInput.value.trim() !== "" &&
      categorieInput.value !== "" &&
      isFileSizeValid
    ) {
      validateButton.disabled = false;
      validateButton.classList.add("validate-button-enabled");
      formMessage.textContent = "";
    } else {
      validateButton.disabled = true;
      validateButton.classList.remove("validate-button-enabled");
      if (!isFileSizeValid) {
        formMessage.textContent = "Sélectionnez un fichier de 4 Mo MAX";
      } else {
        formMessage.textContent = "Merci de remplir tous les champs.";
      }
    }
  }

  validateButton.addEventListener("click", async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", titleInput.value);
    formData.append("category", categorieInput.value);
    formData.append("image", selectedFile);

    const userToken = localStorage.getItem("token");

    const response = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + userToken,
      },
      body: formData,
    });

    if (response.ok) {
      console.log("Work envoyé avec succès");

      closeAddWorkModal();

      const works = await fetchWorks();
      displayWorks(works);

      thumbnails();
    } else {
      console.error("Erreur lors de l'envoi du travail:", response.statusText);
    }
  });
});
