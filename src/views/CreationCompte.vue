<!-- On implémente le HTML-->
<template>  
    <div id="loginBox" class="container">
        <div class="row justify-content-center">
            <form class="form col-10 col-md-8 col-lg-6 col-xl-4 ">
                <img alt="Groupomania logo" src="../assets/images/logo_groupo.png" id="logoAccueil">
                <h1 class="titleNetwork">Votre réseau social</h1>
                <div class="col">
                    <input type="text" class="form-control" id="username" aria-describedby="userName" placeholder="Nom d'utilisateur" required>
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" required>
                </div>
                <div class="col">
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" required>
                </div>
                <div class="col">
                    <input type="text" class="form-control" id="surname" aria-describedby="Surname" placeholder="Prénom" required>
                </div>
                <div class="col">
                    <input type="text" class="form-control" id="name" aria-describedby="Name" placeholder="Nom" required>
                </div>
                <div class="col">
                    <input type="email" class="form-control" id="email" aria-describedby="helpEmail" placeholder="Email" required>
                </div>
                <div class="col">
                    <input type="text" class="form-control" id="Department" aria-describedby="Department" placeholder="Service" required>
                </div>
                <div class="col">
                    <input type="tel" class="form-control" id="tel" aria-describedby="Telephone" placeholder="Tel du poste">
                </div>
                <div class="col">
                    <div class="form-check">
                        <input class="form-check-input is-invalid" type="checkbox" value="" id="agrementCheck" required>
                        <label class="agrementText" for="agrementCheck">
                            Je suis d'accord avec les <a href="">termes et conditions</a> du réseau social
                        </label>
                        <div class="agrementAlert invalid-feedback">
                            Vous devez agréer avant de créer votre compte 
                        </div>
                        </div>
                </div>
                <button type="submit" class="btn btn-primary">Créer son compte</button>
            </form>
        </div>
    </div>
</template>

<!-- On écrit la logique du composant puis on l'exporte -->
<script>
export default {
  name: 'CreationCompte',

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

