<!-- RÔLE :  ICI ON CREE LA VIEW LOGIN ET CREATION DE COMPTE ET ON ECRIT LA LOGIQUE DU LOGIN ET DE LA CREATION DE COMPTE-->

<!-- On implémente le HTML avec des v-if, v-else en fonction de si on est en mode 'login' ou 'create'.-->
<template>
  <div id="loginBox" class="container">
        <div class="row justify-content-center">
            <img alt="Groupomania logo" src="../assets/images/logo_groupo.png" id="logoAccueil">
            <h1 class= "login_title" v-if="mode == 'login'">Se connecter</h1>
            <h1 class= "login_title" v-else>Créer son compte</h1>
            <form class="form col-10 col-md-8 col-lg-6" id="form" action="">
                <div class="form-group">
                    <div class="col required d-flex">
                        <input 
                        type="email" 
                        class="form-control" 
                        id="email" 
                        name="email"
                        aria-describedby="helpEmail" 
                        placeholder="Email"
                        v-model="email"
                        required>
                    </div>
                    <div class="col required d-flex">
                        <!-- SI toutes mes règles de validation sont contrôlées dans le backend, je suis obligé de valider le mot de passe initial dans html5 car dans le back, la règle de validation s'applique après le traitement Bcrypt et pas à l'envoie de la requête !-->
                        <input 
                        type="password" 
                        class="form-control" 
                        id="password"
                        name="password" 
                        placeholder="Mot de passe" 
                        v-model="password" 
                        required  
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 3}$" />
                    </div>
                </div>
                <p class="loginError text-danger" v-if="loginError == true" >{{ this.loginErrorMessage }} </p>
                <p class="text-success" v-if="mode == 'create'">Le mot de passe doit comprendre au minimum 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial</p>
                <div class="form-group" v-if="mode == 'create'" >
                    <div class="d-flex justify-content-between" >
                        <div class="d-flex required">
                            <input 
                            type="text" 
                            class="form-control" 
                            id="surname"
                            name="surname" 
                            aria-describedby="Surname" 
                            placeholder="Prénom"
                            v-model="surname" 
                            required>
                        </div>
                        <div class="d-flex required">
                            <input 
                            type="text" 
                            class="form-control" 
                            id="name" 
                            aria-describedby="Name" 
                            placeholder="Nom"
                            v-model="name" 
                            required>
                        </div>
                    </div>
                    <input 
                    type="text" 
                    class="form-control" 
                    id="department" 
                    aria-describedby="Department" 
                    placeholder="Service"
                    v-model="department">
                    <input 
                    type="tel" 
                    class="form-control" 
                    id="tel"
                    name="tel" 
                    aria-describedby="Telephone" 
                    placeholder="Tel du poste"
                    v-model="tel">
                </div>
                <div class="d-flex required" v-if="mode == 'create'">
                    <!-- Ici on va créer un input checkbox qui devra être coché pour valider le formulaire. On va devoir envoyer la valeur de l'input une fois validé (value="ok") à l'API (propriété "checkConditions" du modèle User)pour que le formulaire ne soit pas envoyé sans que la box soit checkée. -->
                        <input 
                            class="form-check-input" 
                            type="checkbox" 
                            id="agrementCheck"
                            v-model="checkConditions"
                            @click="validateConditions()" 
                            required>
                            <p class="ps-1">Je suis d'accord avec les <a href="">termes et conditions</a> du réseau social</p>
                            

                </div>
                <!-- EN mode 'login', en cliquant sur le bouton j'appelle la méthode de login-->
                <!-- Je vais créer un bouton qui aura une classe dynamique en fontion d'un état (true ou false, selon le résultat de la méthode validatedFields qui vérifie que tous les champs sont remplis), grace à v-bind. C'est la classe disabled--><!-- Surtout pas de bouton de type "submit" car ca bug avec Axios ! Il faur passer le type du button en "button" !!!-->
                <button 
                    type="button" 
                    class="btn btn-primary login_button"
                    :class="{'disabled' : !validatedFields}"
                    v-if="mode == 'login'"
                    @click="loginUser()">
                    Connexion</button>
                <!-- EN mode 'creation de compte', en cliquant sur le bouton j'appelle la méthode createAccount--><!-- Surtout pas de bouton de type "submit" car ca bug avec Axios ! Il faur passer le type du button en "button" !!!-->
                <button 
                    type="button" 
                    class="btn btn-primary createAccount_button"
                    :class="{'disabled' : !validatedFields}"
                    v-else 
                    @click="createAccount()"
                    >Créer son compte</button>
            </form>
        </div>
        <div class="row creationCompte justify-content-center" >
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
        // je crée un état "isLogged" qui exprime si le user est loggé ou pas. La valeur par défaut est non, donc false. 
        isLogged: false,
        // je crée une donnée/état "mode" qui aura pour valeur initiale "login". Le mode me permettra de switcher entre l'affichage pour se logger ou celui pour créer un compte. 
        mode: 'login', //par défaut au chargement de la page, le mode a pour valeur 'login', on affichera donc les éléments qui concernent ce mode. 
        // je créé maintenant mes données issus des champs qui utilisent v-model, et je leur passe la valeur "" (vide) par défaut. Dés qu'un user va entrer une valeur, la donnée correspondante sera mise à jour. 
        password: "",
        surname: "",
        name:"",
        email: "",
        department: "",
        tel: "",
        userPicture: '',
        checkConditions: false,
        loginError: false,
        loginErrorMessage: '',
    }
  },

  computed: {
    // Je crée la fonction qui va retourner une valeur true ou false (et donc une erreur à afficher) si les champs sont remplis ou pas. 
    validatedFields: function () {
        if(this.mode == 'create') {
            if(this.password != "" && this.surname != "" && this.name != "" && this.email != "" && this.checkConditions != false) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            if(this.email != "" && this.password != "")
                return true;
            else{
                return false;
            }
        }
    }
  },

   //pour exécuter la méthode après le monatge de la page, on va l'appeler dans le hook "mounted
    mounted: function() {
        this.redirectionIfIsLogged();
    },

  methods: {
    validateConditions : function () {
        this.checkConditions = true; // Lorsque l'on coche la validation des conditions, la donnée "checkConditions" passe à "true".
    },

    // fonction pour l'affichage conditionnel des champs du formulaire login/création de compte
    switchToCreateAccount : function () {
        this.mode = 'create'; // la méthode sert à passer la valeur du 'mode' à 'create' quand on clique sur le lien de création de compte. 
        this.loginError = false; // S'il y a un message d'erreur de login auparavnt, je l'enlève
    },

    // fonction pour renvoyer le user vers la page d'accueil s'il est déjà loggé
    redirectionIfIsLogged : function () {
        let isLogged = JSON.parse(localStorage.getItem("login"));
        if(isLogged == true) {
            this.$router.push('/'); //ici je crée une redirection de page (de view) avec la méthode push du router. Le paramètre est le chemin de la route. 
        }
        else {
            console.log("l'accès à la page d'accueil n'est pas autorisé, vous devez vous logger !")
        }
    }, 

    // fonction pour se logger
    loginUser: function () {
        //je me connecte avec axios sur la route de login en lui passant en paramètre la route, l'objet à transmettre et l'objet d'entête http.
       this.axios
        .post('http://localhost:3000/api/login', 
            {
            email: this.email,
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
                console.log(`L'utilisateur ${this.email} s'est bien connecté !`);
                localStorage.setItem("token", JSON.stringify(response.data.token));
                localStorage.setItem("userId", JSON.stringify(response.data.data.id));
                localStorage.setItem("userSurname", JSON.stringify(response.data.data.surname));
                localStorage.setItem("userName", JSON.stringify(response.data.data.name));
                this.$router.push('/'); //ici je crée une redirection de page (de view) avec la méthode push du router. Le paramètre est le chemin de la route. 
            }      
        )
        .catch((error) =>{
            //on va récupérer le message d'erreur construit dans le backend
            console.log(error.response.data.message);
            this.loginErrorMessage = error.response.data.message;
            this.loginError = true;
        })

    },
    // fonction pour créer un compte
    createAccount: function () {
        let formData = new FormData() // Je crée un nouvel objet formData
        formData.append('email', this.email) // j'ajoute la propriété et sa valeur à formData
        formData.append('password', this.password)
        formData.append('surname', this.surname)
        formData.append('name', this.name)
        formData.append('department', this.department)
        formData.append('tel', this.tel)
        //je me connecte avec axios sur la route de login en lui passant en paramètre la route, l'objet à transmettre et l'objet d'entête http.
       this.axios
        .post('http://localhost:3000/api/users', formData,
            {headers: 
                { 'Content-Type': 'application/json'}
            }
        )
        // je récupère le message de la réponse de l'API, et je renvoie vers la page de login 
        .then( () => {
                console.log(`L'utilisateur ${this.email} a bien été créé !`)
                this.mode = 'login';
                this.$router.push('/login'); // je renvoie vers la page de login
            }      
        )
        .catch((error) =>{
            //on va récupérer le message d'erreur construit dans le backend
            console.log(error.response.data.message.split(':')[1]);
            this.loginErrorMessage = error.response.data.message.split(':')[1];
            this.loginError = true;
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
    & .disabled{
        background-color: rgb(170, 170, 170);
    }
}

.creationCompte {
    margin-top: 40px;
}

.required::after {
    content: "*";
    color: red;
    margin-left: 2px;
    margin-right: 2px;
}

</style>
