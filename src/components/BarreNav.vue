<template>
    <div class="container-fluid BarreNav">
        <nav class="navbar d-flex flex-nowrap" style="background-color: aliceblue;">
            <a class="navbar-brand logoNavbar" href="#">
                <img src="../assets/images/logo_groupo.png" class="logo d-inline-block align-top" alt="groupomania logo" height="50">
            </a>
            <form class="input-group d-flex me-3 w-50" role="search">
                <input class="form-control" type="search" placeholder="Rechercher vos articles par mots clés !" aria-label="Search">
                <button class="btn btn-outline-primary" type="button"><font-awesome-icon icon="fa-solid fa-magnifying-glass" /></button>
            </form>
            <div class="profil-menu dropdown">
                <!-- Je rend dynamique avec v-bind l'affichage de l'image avec la donnée que je récupère de la requête API et que j'enregistre dans ma data "userPicture" du view-->
                <a href="" class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    <img :src="userPicture" alt="" class="userPicture">
                </a>
                <div class="dropdown-menu dropdown-menu-end">
                    <router-link class="dropdown-item" to="/">Accueil</router-link>
                    <router-link class="dropdown-item" to="/profil">Profil</router-link>
                    <a href="#"  class="dropdown-item" @click="deconnectUser()">Déconnexion</a>
                </div>
            </div>          
        </nav>
    </div>
    
</template>

<script>

export default {
  name: 'BarreNav',
  data () {
    return {
        token: JSON.parse(localStorage.getItem("token")),
        userId: JSON.parse(localStorage.getItem("userId")),
        userPicture: '',
        isLogged: '',
    }
  },

    //pour exécuter la méthode avant le lancement de la page, on va l'appeler dans le hook "created"
    mounted: function() {
        this.getProfilPicture();
    },

  methods: {
        // Fonction pour afficher la photo du profil dans la barre de navigation
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
        // Fonction pour déconnecter le user et modifier le localStorage
        deconnectUser: function () {
            localStorage.setItem("login", false);
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            localStorage.removeItem("userSurname");
            localStorage.removeItem("userName");
            this.$router.push('/login');
        }
        
    },
}

</script>

<style scoped lang="scss">

.userPicture {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    object-fit: cover;
}

a {
    text-decoration: none;
}

</style>