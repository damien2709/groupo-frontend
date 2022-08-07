<!-- On implémente le HTML-->
<template>  
    <div id="loginBox" class="container">
        <div class="row justify-content-center">
            <form class="form col-10 col-md-8 col-lg-6 col-xl-4 ">
                <img alt="Groupomania logo" src="../assets/images/logo_groupo.png" id="logoAccueil">
                <h1 class="titleNetwork">Votre réseau social</h1>
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
                <div class="col">
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
                <div class="col">
                    <input 
                    type="text" 
                    class="form-control" 
                    id="surname" 
                    aria-describedby="Surname" 
                    placeholder="Prénom"
                    v-model="surname" 
                    required>
                </div>
                <div class="col">
                    <input 
                    type="text" 
                    class="form-control" 
                    id="name" 
                    aria-describedby="Name" 
                    placeholder="Nom"
                    v-model="name" 
                    required>
                </div>
                <div class="col">
                    <input 
                    type="email" 
                    class="form-control" 
                    id="email" 
                    aria-describedby="helpEmail" 
                    placeholder="Email"
                    v-model="email" 
                    required>
                </div>
                <div class="col">
                    <input 
                    type="text" 
                    class="form-control" 
                    id="department" 
                    aria-describedby="Department" 
                    placeholder="Service"
                    v-model="department" 
                    required>
                </div>
                <div class="col">
                    <input 
                    type="tel" 
                    class="form-control" 
                    id="tel" 
                    aria-describedby="Telephone" 
                    placeholder="Tel du poste"
                    v-model="tel">
                </div>
                <p>
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
                <button 
                    type="submit" 
                    class="btn btn-primary" 
                    @click="createAccount()"
                    >Créer son compte</button>
            </form>
        </div>
    </div>
</template>

<!-- On écrit la logique du composant puis on l'exporte -->
<script>

export default {
  name: 'CreationCompte',

  methods: {
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
    & .form {
        max-height: 100%;
    }
    & .btn {
        margin-top: 15px;
    }
}

.creationCompte {
    margin-top: 20px;
}

@media (max-width: 767px) {
    #loginBox {
        padding : 10px 20px;
        & input {
            margin-bottom: 10px;
        }
        & .titleNetwork {
            font-size: 24px;
            margin-bottom: 10px;
        }
        & #logoAccueil {
            margin-bottom: 20px;
        }
        & .form-check {
            margin-top: 20px;
        }   
    }
}

</style>

