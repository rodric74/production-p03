const urlWorks = "https://moncloud.alwaysdata.net/api/works";
const urlCateggories = "https://moncloud.alwaysdata.net/api/categories";

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