<template>
  <div class="container BarreCategories mt-2">
        <div class="row blockCard">
            <button class="card col-md-6 col-lg-3 h-25" @click="reqCat('Infos')">
                <img class="card-img-top" src="../assets/images/entreprise-1.jpeg" alt="entreprise Groupomania">
                <div class="card-body">
                    <h5 class="card-title">Infos</h5>
                </div>
            </button>
            <button class="card col-md-6 col-lg-3 h-25" @click="reqCat('Projet')">
                <img class="card-img-top" src="../assets/images/projet-1.jpeg" alt="Projet de Groupomania">
                <div class="card-body">
                    <h5 class="card-title">Projets</h5>
                </div>
            </button>
            <button class="card col-md-6 col-lg-3 h-25" @click="reqCat('Entraide')">
                <img class="card-img-top" src="../assets/images/collaboration-1.jpeg" alt="Scène d'entraide Groupomania">
                <div class="card-body">
                    <h5 class="card-title">Entraide</h5>
                </div>
            </button>
            <button class="card col-md-6 col-lg-3 h-25" @click="reqCat('Fun')">
                <img class="card-img-top" src="../assets/images/restaurant-1.jpeg" alt="Restaurant pizzeria">
                <div class="card-body">
                    <h5 class="card-title">Fun</h5>
                </div>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BarreCategories',

    data () {
        return {
            token: JSON.parse(localStorage.getItem("token")),
        }
    },

    methods: {
        reqCat: function(para) {
            this.axios
                .get(`http://localhost:3000/api/posts?category=${para}`, 
                    {headers: 
                        { "Authorization": `Bearer ${this.token}`}
                    }
                )
                // je récupère la réponse de l'API, je charge dans le localStorage la clé/valeur "login" et la clé/valeur "token".
                .then(response => {
                    console.log(response.data);
                })
                .catch((error) =>{
                    console.log(error.message);
                })
        }
    }
}

</script>

<style scope lang="scss">
.card-img {
    &-top {
    height: 90px;
    width: auto;
    object-fit: cover;
    }
}
</style>