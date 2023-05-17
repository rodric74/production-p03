const urlWorks = "http://localhost:5678/api/works";
const urlCateggories = "http://localhost:5678/api/categories";

// FONCTION POUR RECUPERER LES DONNEES DE L'API
export async function fetchWorks() {
  try {
    const response = await fetch(urlWorks);
    return response.ok ? await response.json() : null;
  } catch (error) {
    console.error("Erreur lors de la récupération des données");
    return null;
  }
}

// FONCTION POUR RECUPERER LES CATEGORIES DE L'API
export async function fetchCategories() {
    try {
      const response = await fetch(urlCateggories);
      return response.ok ? await response.json() : null;
    } catch (error) {
      console.error("Erreur lors de la récupération des données");
      return null;
    }
  }