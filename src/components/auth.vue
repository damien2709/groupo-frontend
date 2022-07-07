<!-- ******* ROLE: gère l'affichage et la logique de l'authentification -->

<!-- On implémente le HTML-->
<template>  
    <div id="loginBox" class="container">
        <div class="row justify-content-center">
            <form class="form col-10 col-md-8 col-lg-6 col-xl-4 ">
                <img alt="Groupomania logo" src="../assets/images/logo_groupo.png" id="logoAccueil">
                <h1 class="titleNetwork">Votre réseau social</h1>
                <div class="form-group">
                    <input type="email" class="form-control" id="InputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                </div>
                <div class="form-group">
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                </div>
                
                <button type="submit" class="btn btn-primary">Connexion</button>
            </form>
        </div>
        <div class="row creationCompte justify-content-center">
            <p>Vous n'avez pas encore de compte : <a href="">Créez un compte</a></p>
        </div>
    </div>
</template>

<!-- On écrit la logique du composant puis on l'exporte -->
<script>
export default {
  name: 'AuthAppli',
  props: {

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
    margin-top: 20px;
}





</style>
