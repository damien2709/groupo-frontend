<template>
  <div class="container-fluid MyNavbar">
    <div class="row">
         <nav class=" col navbar navbar-light bg-light justify-content-between">
            <a class="navbar-brand logoNavbar" href="#">
                <img src="../assets/images/logo_groupo.png" class="logo d-inline-block align-top" alt="groupomania logo">
            </a>
            <form class="form-inline ">
                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>

        </nav>
    </div>
  </div>
  <div class="container">
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
  <div class="container">
    <div class=" row titleBlock">
        <h2 class="titleH2">Les articles</h2>
    </div>
    <div class="row wall">
        <div class="col col allArticles">
            <p>Le mur de tous les articles</p>

        </div>
        <div class="col lastArticles">
            <p>les articles récents</p>

        </div>

    </div>
  </div>
</template>

<script>
export default {
    name: 'MyWall',
    props: {

  }
}
</script>

<style scoped lang="scss">
.navbar {
    & .logoNavbar {
        & .logo {
            max-width: 200px;
        }
    }
    & form {
        display: flex;
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