//CHANGER login EN logout 
window.onload = function() {
    const loginLink = document.getElementById('login--link');
  
    // Vérifie si un token d'authentification existe dans le stockage local
    const token = localStorage.getItem('token');
  
    if (token) {
      // Si un token existe, change le texte du lien en "Logout"
      loginLink.textContent = 'Logout';
  
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
  