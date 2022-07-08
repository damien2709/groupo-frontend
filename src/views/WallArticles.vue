<template>
  <div class="container-fluid MyNavbar">
    <nav class=" row navbar navbar-light bg-light justify-content-space-between">
        <a class="navbar-brand logoNavbar col-4 col-md-3" href="#">
            <img src="../assets/images/logo_groupo.png" class="logo d-inline-block align-top" alt="groupomania logo">
        </a>
        <form class="form-inline col-7 col-md-5">
            <input class="form-control mr-sm-2" type="search" placeholder="Rechercher des articles" aria-label="Search">
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit"><font-awesome-icon icon="fa-solid fa-magnifying-glass" /></button>
        </form>
        <div class="buttonsGroup col-md-3">
                <button type="button" class="btn btn-primary">Se déconnecter</button>
        </div>
    </nav>
  </div>
  <div class="container MyCategories">
    <div class="row titleBlock">
        <h2 class="titleH2">
            Nos catégories d'articles
        </h2>
    </div>
    <div class="row blockCard">
        <div class="card col-md-6 col-lg-3">
            <img class="card-img-top" src="../assets/images/entreprise-1.jpeg" alt="entreprise Groupomania">
            <div class="card-body">
                <h5 class="card-title">Infos</h5>
                <p class="card-text">Retrouvez toutes les informations institutionnelles de votre entreprise préférée !</p>
                <a href="#" class="btn btn-primary">J'y vais !</a>
            </div>
        </div>
        <div class="card col-md-6 col-lg-3">
            <img class="card-img-top" src="../assets/images/projet-1.jpeg" alt="Projet de Groupomania">
            <div class="card-body">
                <h5 class="card-title">Projets</h5>
                <p class="card-text">Découvrez les nouveau projets ou ceux en cours et n'hésitez pas à proposer votre collaboration !</p>
                <a href="#" class="btn btn-primary">J'arrive !</a>
            </div>
        </div>
        <div class="card col-md-6 col-lg-3">
            <img class="card-img-top" src="../assets/images/collaboration-1.jpeg" alt="Scène d'entraide Groupomania">
            <div class="card-body">
                <h5 class="card-title">Entraide</h5>
                <p class="card-text">On a tous besoin d'un petit coup de main! Mettez votre expérience au service de vos collaborateurs ! </p>
                <a href="#" class="btn btn-primary">Je viens !</a>
            </div>
        </div>
        <div class="card col-md-6 col-lg-3">
            <img class="card-img-top" src="../assets/images/restaurant-1.jpeg" alt="Restaurant pizzeria">
            <div class="card-body">
                <h5 class="card-title">Fun</h5>
                <p class="card-text">Pour les loisirs et les moments de convivialité intra ou extra entreprise, c'est ici !</p>
                <a href="#" class="btn btn-primary">Let' go !</a>
            </div>
        </div>
    </div>
  </div>
<div class=" container myArticles">
    <div class=" row titleBlock">
        <h2 class="titleH2">Les articles</h2>
    </div>
    <div class="row wall">
        <div class="col col allArticles ">
            <p>Le mur de tous les articles</p>
            <p>{{ getListOfPosts () }}</p> <!-- Ici j'appelle la méthode 'getListOfPosts' définie plus bas.  -->

        </div>
        <div class="col lastArticles">
            <p>les articles récents</p>

        </div>

    </div>
</div>
</template>

<script>

/* Ici on ajoute les propriétés de données, les méthodes, les cycles de vie (hooks) */

export default {
    name: 'MyWall',
    methods: {
        getListOfPosts () {
            this.axios.get('https://ghibliapi.herokuapp.com/films')
            .then((response) => {
                console.log(response.data)
            })
        } // Je vais appeler cette méthode en utilisant les doubles accolades dans l'élément HTML concerné. 
    },
}
</script>

<style scoped lang="scss">
.navbar {
    & .logoNavbar {
        & .logo {
            max-width: 100%;
            object-fit: contain;

        }
    }
    & form {
        display: flex;
    }
    & .buttonsGroup {
        & .btn {
            display: inline-block;
            margin-right: 10px;
            width: 150px;
        }
    }
}

.titleBlock {
    margin: 30px 0;
    text-align: left;
    & .titleH2 {
        font-size: 20px;
    }
}

</style>