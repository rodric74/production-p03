import { fetchWorks, fetchCategories } from './data.js';
console.log('Le script index.js est chargé et exécuté.');
// FONCTION POUR AFFICHER LES WORKS
export function displayWorks(works) {
  const gallery = document.querySelector(".gallery");
  // je vide le contenu de la galerie pour la remplir avec de nouvelles données
    gallery.innerHTML = "";

  if (works) {
    works.forEach((work) => {
      const figure = document.createElement("figure");
      figure.setAttribute("data-category", work.category.id);
      const img = document.createElement("img");
      img.src = work.imageUrl;
      img.alt = work.title;
      const figcaption = document.createElement("figcaption");
      figcaption.textContent = work.title;
      figure.appendChild(img);
      figure.appendChild(figcaption);
      gallery.appendChild(figure);
    });
  }
}

// Appel de la fonction pour afficher les works au chargement de la page
fetchWorks().then(displayWorks);

// FONCTION POUR FILTRER LES WORKS
function filterWorks(categoryId) {
  fetchWorks().then((works) => {
    // Si l'ID de la catégorie n'est pas "all", on filtre les travaux
    if (categoryId !== "all") {
      works = works.filter(work => work.category.id.toString() === categoryId);
    }
    // Afficher les travaux filtrés (ou tous les travaux si l'ID de la catégorie est "all")
    displayWorks(works);
  });
}

// FONCTION POUR AFFICHER LES FILTRES DE CATEGORIE 
function displayCategories(categories){
  const categorieFilter = document.querySelector(".categorieFilter");
// AJOUT DU BOUTON "TOUS"
  const allButton = document.createElement("button");
  allButton.textContent = "Tous";
  allButton.classList.add("filter-btn");
  allButton.setAttribute("data-category", "all");
  categorieFilter.appendChild(allButton);

// AJOUT DES AUTRES BOUTONS
  categories.forEach((category) => {
    const button = document.createElement("button");
    button.textContent = category.name;
    button.classList.add("filter-btn");    
    button.setAttribute('data-category', category.id)
    categorieFilter.appendChild(button);
  });

  // On ajoute un événement 'click' sur tous les boutons de filtre
  document.querySelectorAll('.filter-btn').forEach((btn) => {
  btn.addEventListener('click', (event) => {
    // On récupère l'id de la catégorie du bouton cliqué
    const categoryId = event.target.getAttribute('data-category');
    // On filtre les works en fonction de cette catégorie
    filterWorks(categoryId);

    // On ajoute la classe "active" au bouton cliqué
    event.target.classList.add('active');

    // On retire la classe "active" de tous les autres boutons
    document.querySelectorAll('.filter-btn').forEach((otherBtn) => {
      if (otherBtn !== event.target) {
        otherBtn.classList.remove('active');
      }
    });
  });
});

  // On déclenche un clic sur le bouton "Tous" pour activer le filtre "Tous" par défaut
  allButton.click();
}

//UTILISATEUR CONNECTÉ

// Récupération du token dans le stockage local
const token = localStorage.getItem('token');

// Vérifie si le token existe
if (token) {
  // L'utilisateur est connecté
  console.log('Utilisateur connecté avec succès');
  
  // Crée un nouvel élément script
  const script = document.createElement('script');

  // Définit l'attribut src de l'élément script
  script.src = './assets/editor.js';

  // Ajoute l'élément script à la fin du document
  document.body.appendChild(script);
} else {
  // Si l'utilisateur n'est pas connecté
  // Appel de la fonction pour afficher les catégories au chargement de la page
fetchCategories().then(displayCategories);
}

// OUVERTURE MODALE en mode edition  

document.addEventListener('DOMContentLoaded', function() {
  let modal = document.querySelector('.modal-delete-work-container');
  let editBtn = document.querySelector('#edit--svg');

  editBtn.addEventListener('click', function() {
      modal.style.display = "flex";
  });
});


