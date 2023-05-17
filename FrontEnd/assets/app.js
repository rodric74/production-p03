const urlWorks = "http://localhost:5678/api/works";
const urlCateggories = "http://localhost:5678/api/categories";

// FONCTION POUR RECUPERER LES DONNEES DE L'API
async function fetchWorks() {
  try {
    const response = await fetch(urlWorks);
    return response.ok ? await response.json() : null;
  } catch (error) {
    console.error("Erreur lors de la récupération des données");
    return null;
  }
}
// FONCTION POUR AFFICHER LES WORKS
function displayWorks(works) {
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

// FONCTION POUR RECUPERER LES CATEGORIES DE L'API
async function fetchCategories() {
  try {
    const response = await fetch(urlCateggories);
    return response.ok ? await response.json() : null;
  } catch (error) {
    console.error("Erreur lors de la récupération des données");
    return null;
  }
}
// fetchCategories().then(categories => console.log(categories));

// FONCTION POUR AFFICHER LES FILTRES DE CATEGORIE 
function displayCategories(categories){
  const categorieFilter = document.querySelector(".categorieFilter");

  categories.forEach((category) => {
    const button = document.createElement("button");
    button.textContent = category.name;
    // console.log(category);
    button.setAttribute('data-category', category.id)
    categorieFilter.appendChild(button);
  })
}
fetchCategories().then(displayCategories);

