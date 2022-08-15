<template>
    <div class="container-fluid MyNav">
        <nav class=" row navbar navbar-light bg-light justify-content-space-between">
            <a class="navbar-brand logoNavbar col-4 col-md-3" href="#">
                <img src="../assets/images/logo_groupo.png" class="logo d-inline-block align-top" alt="groupomania logo">
            </a>
            <form class="form-inline col-7 col-md-5">
                <input class="form-control mr-sm-2" type="search" placeholder="Rechercher des articles par mots clés" aria-label="Search">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit"><font-awesome-icon icon="fa-solid fa-magnifying-glass" /></button>
            </form>
           
            
            <div class="d-flex flex-column align-items-center text-center mt-5 mb-4">
                        <!-- Je rend dynamique avec v-bind l'affichage de l'image avec la donnée que je récupère de la requête API et que j'enregistre dans ma data "userPicture" du view-->
                        <img :src="this.userPicture" id="userPicture" alt="user Profil">
            </div>
            <div class="routerNav">
                <router-link to="/">Accueil</router-link> |
                <router-link to="/profil">Profil</router-link> |
                <router-link to="/login">Login</router-link> |
                <a href=""  @click="deconnectUser()">Se déconnecter</a>
            </div>
        </nav>
    </div>
    
</template>

<script>

export default {
  name: 'MyNav',
  data () {
    return {
        token: JSON.parse(localStorage.getItem("token")),
        userId: JSON.parse(localStorage.getItem("userId")),
        userPicture: '',
    }
  },

    //pour exécuter la méthode avant le lancement de la page, on va l'appeler dans le hook "created"
    created: function() {
        this.getProfilPicture();
    },

  methods: {
        getProfilPicture: function () {
            this.axios
                .get(`http://localhost:3000/api/users/${this.userId}`, 
                    {headers: 
                        { "Authorization": `Bearer ${this.token}`}
                    }
                )
                // je récupère la réponse de l'API, je charge dans le localStorage la clé/valeur "login" et la clé/valeur "token".
                .then(response => {
                    console.log(response.data);
                    this.userPicture = response.data.data.picture;
                })
                .catch((error) =>{
                    console.log(error.message);
                })
        },
        deconnectUser: function () {
            localStorage.setItem("login");
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            this.$router.push('/login');
        }
        
    },
}

</script>

<style scoped lang="scss">
.form-control {
    width: 80%;
    display: inline-block;
}


</style>