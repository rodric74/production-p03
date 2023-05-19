const urlLoginUser = "http://localhost:5678/api/users/login"

document.getElementById('login--form').addEventListener('submit', (event) => {
    // Empêche le formulaire de soumettre normalement
    event.preventDefault();
  
    // Obtient les valeurs des champs de formulaire
    const email = document.getElementById('login--email').value;
    const password = document.getElementById('login--password').value;
  
    // Envoie une requête POST à l'API pour se connecter
    fetch(urlLoginUser, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    .then((response) => {
        if (response.status === 401) {
            throw new Error('Email ou mot de passe incorrect.');
        }
        if (response.status === 404) {
            throw new Error('Utilisateur non trouvé.');
        }
        if (!response.ok) {
            throw new Error('Erreur de connexion.');
        }
        return response.json();
    })
    .then((data) => {
        // Sauvegarde le token d'authentification dans le stockage local du navigateur
        localStorage.setItem('token', data.token);
        console.log('Utilisateur connecté avec succès');
        // Crée un nouvel élément script
        const script = document.createElement('script');
      
        // Définit l'attribut src de l'élément script
        script.src = './assets/editor.js';
      
        // Ajoute l'élément script à la fin du document
        document.body.appendChild(script);
      
        // Redirige vers la page d'accueil
        window.location.href = 'index.html';
      })
    .catch((error) => {
        // Affiche une erreur à l'utilisateuret à la console
        document.getElementById('error-message').textContent = error.message;
        console.error('Erreur:', error);
    });
});

  
