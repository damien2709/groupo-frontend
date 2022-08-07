<!-- RÔLE :  ICI ON CREE LA VIEW LOGIN ET CREATION DE COMPTE ET ON ECRIT LA LOGIQUE DU LOGIN ET DE LA CREATION DE COMPTE-->

<!-- On implémente le HTML avec des v-if, v-else en fonction de si on est en mode 'login' ou 'create'.-->
<template>
  <div id="loginBox" class="container">
        <div class="row justify-content-center">
            <img alt="Groupomania logo" src="../assets/images/logo_groupo.png" id="logoAccueil">
            <h1 class= "login_title" v-if="mode == 'login'">Se connecter</h1>
            <h1 class= "login_title" v-else>Créer son compte</h1>
            <form class="form col-10 col-md-8 col-lg-6 ">
                <div class="form-group">
                    <div class="col">
                        <input 
                        type="text" 
                        class="form-control" 
                        id="username" 
                        aria-describedby="userName" 
                        placeholder="Nom d'utilisateur"
                        v-model="username" 
                        required>
                    </div>
                    <div class="col" v-if="mode == 'login'">
                        <input 
                        type="password" 
                        class="form-control" 
                        id="password" 
                        placeholder="Mot de passe"
                        v-model="password" >
                    </div>
                    <div class="col" v-else>
                        <!-- SI toutes mes règles de validation sont contrôlées dans le backend, je suis obligé de valider le mot de passe initial dans html5 car dans le back, la règle de validation s'applique après le traitement Bcrypt et pas à l'envoie de la requête !-->
                        <input 
                        type="password" 
                        class="form-control" 
                        id="exampleInputPassword1" 
                        placeholder="Mot de passe" 
                        v-model="password" 
                        required  
                        pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" />
                    </div>
                </div>
                <div class="form-group" v-if="mode == 'create'" >
                    <input 
                    type="text" 
                    class="form-control" 
                    id="surname" 
                    aria-describedby="Surname" 
                    placeholder="Prénom"
                    v-model="surname" 
                    required>
                    <input 
                    type="text" 
                    class="form-control" 
                    id="name" 
                    aria-describedby="Name" 
                    placeholder="Nom"
                    v-model="name" 
                    required>
                    <input 
                    type="email" 
                    class="form-control" 
                    id="email" 
                    aria-describedby="helpEmail" 
                    placeholder="Email"
                    v-model="email" 
                    required>
                    <input 
                    type="text" 
                    class="form-control" 
                    id="department" 
                    aria-describedby="Department" 
                    placeholder="Service"
                    v-model="department" 
                    required>
                    <input 
                    type="tel" 
                    class="form-control" 
                    id="tel" 
                    aria-describedby="Telephone" 
                    placeholder="Tel du poste"
                    v-model="tel">
                </div>
                <p v-if="mode == 'create'">
                    <!-- Ici on va créer un input checkbox qui devra être coché pour valider le formulaire. On va devoir envoyer la valeur de l'input une fois validé (value="ok") à l'API (propriété "checkConditions" du modèle User)pour que le formulaire ne soit pas envoyé sans que la box soit checkée. -->
                    <input 
                        class="form-check-input" 
                        type="checkbox" 
                        id="agrementCheck"
                        v-model="checkConditions"
                        value= "ok" 
                        required>
                            Je suis d'accord avec les <a href="">termes et conditions</a> du réseau social
                </p>
                <!-- EN mode 'login', en cliquant sur le bouton j'appelle la méthode de login-->
                <button 
                    type="button" 
                    class="btn btn-primary login_button"
                    v-if="mode == 'login'"
                    @click="loginUser()">
                    Connexion</button>
                <!-- EN mode 'creation de compte', en cliquant sur le bouton j'appelle la méthode createAccount-->
                <button 
                    type="submit" 
                    class="btn btn-primary createAccount_button"
                    v-else 
                    @click="createAccount()"
                    >Créer son compte</button>
            </form>
        </div>
        <div class="row creationCompte justify-content-center" v-if="mode == 'login'">
            <p>Vous n'avez pas encore de compte : <span @click="switchToCreateAccount()">Créez un compte</span></p>
            <p>Vous avez oublié votre mot de passe : <span>Réinitialiser le mot de passe</span></p>
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
        // je crée une donnée/état "mode" qui aura pour valeur initiale "login". Le mode me permettra de switcher entre l'affichage pour se logger ou celui pour créer un compte. 
        mode: 'login', //par défaut au chargment de la page, le mode a pour valeur 'login', on affichera donc les éléments qui concernent ce mode. 
    }
  },

  methods: {
    switchToCreateAccount : function () {
        this.mode = 'create'; // la méthode sert à passer la valeur du 'mode' à 'create' quand on clique sur le lien de création de compte. 
    },
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

    },
    createAccount: function () {
        //je me connecte avec axios sur la route de login en lui passant en paramètre la route, l'objet à transmettre et l'objet d'entête http.
        
       this.axios
        .post('http://localhost:3000/api/createAccount', 
            {
            username: this.username,
            password: this.password,
            surname: this.surname,
            name: this.name,
            email: this.email, 
            department: this.department,
            tel: this.tel,
            },
            {headers: 
                { "Content-Type": "application/json"}
            }
        )
        // je récupère le message de la réponse de l'API, et je renvoie vers la page de login 
        .then(response => {
                console.log(response.message);
                window.location.href = "http://localhost:8080/login";
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
    padding-top: 7vh;
    & input {
        margin-bottom: 30px;
        
    }
    & #logoAccueil {
    margin-bottom: 40px;
    max-width: 25%;
    }
    & .login_title{
    font-size: 38px;
    margin-bottom: 30px;
    }
    & span {
        color: #0a58ca;
        cursor: pointer;
    }
    & .form-group {
        width: 60%;
        margin: auto;
    }
}

.creationCompte {
    margin-top: 40px;
}
</style>
