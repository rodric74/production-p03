window.onload = function() {
    const loginLink = document.getElementById('login--link');
  
    // Vérifie si un token d'authentification existe dans le stockage local
    const token = localStorage.getItem('token');

    const editBar = document.getElementById('edit-bar');  // <== move this line up here

    if (token) {
      // Si un token existe, change le texte du lien en "Logout"
      loginLink.textContent = 'Logout';
 
        // Si un token existe, retire l'attribut hidden pour rendre tous les éléments visibles
        const hiddenElements = document.querySelectorAll('div[hidden]');
        hiddenElements.forEach(element => {
            element.removeAttribute('hidden');
        });

        // Ajoute la classe .connected à #edit-bar pour le rendre visible
        editBar.classList.add('connected');
        
        // Cache le conteneur de filtres
        const filterContainer = document.querySelector('.categorieFilter');
        filterContainer.style.display = 'none';

        // Ajoute un gestionnaire d'événements de clic pour déconnecter l'utilisateur
        loginLink.addEventListener('click', (event) => {
            event.preventDefault();
  
            // Supprime le token du stockage local
            localStorage.removeItem('token');

            // Supprime la classe .connected de #edit-bar pour le cacher
            editBar.classList.remove('connected');
  
            // Change le texte du lien en "Login"
            loginLink.textContent = 'Login';
  
            // Redirige vers la page d'accueil
            window.location.href = 'index.html';
        });
    }
};
