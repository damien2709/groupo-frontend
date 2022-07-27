<!-- On implémente le HTML-->
<template>
  <div id="loginBox" class="container">
        <div class="row justify-content-center">
            <form class="form col-10 col-md-8 col-lg-6 col-xl-4 ">
                <img alt="Groupomania logo" src="../assets/images/logo_groupo.png" id="logoAccueil">
                <h1 class="titleNetwork">Votre réseau social</h1>
                <div class="form-group">
                    <input 
                    type="text" 
                    class="form-control" 
                    id="username" 
                    aria-describedby="userName" 
                    placeholder="Nom d'utilisateur"
                    v-model="username" 
                    required>
                </div>
                <div class="form-group">
                    <input 
                    type="password" 
                    class="form-control" 
                    id="password" 
                    placeholder="Password"
                    v-model="password" >
                </div>
                
                <button type="submit" 
                class="btn btn-primary"
                @click="loginUser()">
                Connexion</button>
            </form>
        </div>
        <div class="row creationCompte justify-content-center">
            <p>Vous n'avez pas encore de compte : <a href="http://localhost:8080/#/creation/">Créez un compte</a></p>
            <p>Vous avez oublié votre mot de passe : <a href="">Réinitialiser le mot de passe</a></p>
        </div>
    </div>
</template>

<!-- On écrit la logique du composant puis on l'exporte -->
<script>

export default {
  name: 'MyLogin',

  methods: {
    loginUser: function () {
        //je me connecte avec axios sur la route de login en lui passant en paramètre la route, l'objet à transmettre et l'objet d'entête http.
       this.axios
        .post('http://localhost:3000/api/login', 
            {
            username: this.username,
            password: this.password
            },
            {headers: 
                { "Content-Type": "application/json"}
            }
        )
        // je récupère la réponse de l'API, je change la valeur de la propriété "isLogged" à true (l'utilisateur est connecté), je vérifie qu'elle est bien à true, je retourne la valeur du token. 
        .then(response => {
            console.log(response.data);
            response.data.isLogged = true;
            localStorage.setItem("login", JSON.stringify(response.data.isLogged));
            console.log(response.data.isLogged);
            return response.data.token;
            }        
        )
        // j'enregistre le token dans le localStorage du navigateur.
        .then(response => {
            localStorage.setItem("token", JSON.stringify(response))
            })
        /* 
        On va renvoyer le user vers la page du mur d'articles
        */
    }
  }
}

</script>

<!-- On gère le style du HTML du composant. On ajoute l'attribut "scoped" pour limiter le code CSS au composant -->
<style scoped lang="scss">

#loginBox {
    height: 100vh;
    padding : 15vh 20px;
    & input {
        margin-bottom: 30px;
    }
    & #logoAccueil {
    margin-bottom: 40px;
    }
    & .titleNetwork {
    font-size: 28px;
    margin-bottom: 30px;
    }
}

.creationCompte {
    margin-top: 40px;
}
</style>
