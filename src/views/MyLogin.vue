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
                
                <button 
                type="button" 
                class="btn btn-primary"
                @click="loginUser()">
                Connexion</button>
            </form>
        </div>
        <div class="row creationCompte justify-content-center">
            <p>Vous n'avez pas encore de compte : <a href="http://localhost:8080/creation/">Créez un compte</a></p>
            <p>Vous avez oublié votre mot de passe : <a href="">Réinitialiser le mot de passe</a></p>
        </div>
    </div>
</template>

<!-- On écrit la logique du composant puis on l'exporte -->
<script>

export default {
  name: 'MyLogin',

  data() {
    return {
        isLogged: '',
    }
  },

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
        // je récupère la réponse de l'API, je charge dans le localStorage la clé/valeur "login" et la clé/valeur "token". 
        .then(response => {
                console.log(response.status);
                this.isLogged = true;
                localStorage.setItem("login", JSON.stringify(this.isLogged));
                console.log(this.isLogged);
                localStorage.setItem("token", JSON.stringify(response.data.token));
                window.location.href = "http://localhost:8080/";
            }      
        )
        .catch((error) =>{
            console.log(error.message);
        })

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
