<!-- Affichage des 4 thématiques de post en dessous de la barre de navigation-->
<template>
  <div class="container BarreCategories mt-2">
        <div class="row blockCard">
            <div class="card col-6 col-lg-3 h-25">
                <img class="card-img-top" src="../assets/images/entreprise-1.jpeg" alt="entreprise Groupomania">
                <div class="card-body">
                    <h5 class="card-title">Infos</h5>
                </div>
            </div>
            <div class="card col-6 col-lg-3 h-25">
                <img class="card-img-top" src="../assets/images/projet-1.jpeg" alt="Projet de Groupomania">
                <div class="card-body">
                    <h5 class="card-title">Projets</h5>
                </div>
            </div>
            <div class="card col-6 col-lg-3 h-25">
                <img class="card-img-top" src="../assets/images/collaboration-1.jpeg" alt="Scène d'entraide Groupomania">
                <div class="card-body">
                    <h5 class="card-title">Entraide</h5>
                </div>
            </div>
            <div class="card col-6 col-lg-3 h-25">
                <img class="card-img-top" src="../assets/images/restaurant-1.jpeg" alt="Restaurant pizzeria">
                <div class="card-body">
                    <h5 class="card-title">Fun</h5>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

name : 'BarrePresentation',



}
</script>

<style scoped lang="scss">

.card-img {
    &-top {
    height: 90px;
    width: auto;
    object-fit: cover;
    }
}
</style>