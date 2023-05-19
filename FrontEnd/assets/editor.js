//CHANGER login EN logout 
window.onload = function() {
    const loginLink = document.getElementById('login--link');
  
    // Vérifie si un token d'authentification existe dans le stockage local
    const token = localStorage.getItem('token');
  
    if (token) {
      // Si un token existe, change le texte du lien en "Logout"
      loginLink.textContent = 'Logout';
    
      // Ajoute un message de console pour confirmer qu'un utilisateur est connecté
      console.log('Utilisateur connecté avec succès');

      // Si un token existe, retire l'attribut hidden pour rendre tous les éléments visibles
        const hiddenElements = document.querySelectorAll('div[hidden]');
        hiddenElements.forEach(element => {
        element.removeAttribute('hidden');
        });
  
      // Ajoute un gestionnaire d'événements de clic pour déconnecter l'utilisateur
      loginLink.addEventListener('click', (event) => {
        event.preventDefault();
  
        // Supprime le token du stockage local
        localStorage.removeItem('token');
  
        // Change le texte du lien en "Login"
        loginLink.textContent = 'Login';
  
        // Redirige vers la page d'accueil
        window.location.href = 'index.html';
      });
    }
};
  