<template>
    <div class="container-fluid MyNav">
        <nav class=" row navbar justify-content-space-between" style="background-color: aliceblue;">
            <a class="navbar-brand logoNavbar col-3" href="#">
                <img src="../assets/images/logo_groupo.png" class="logo d-inline-block align-top" alt="groupomania logo">
            </a>
            <form class="form-inline col-6">
                <input class="form-control mr-sm-2" type="search" placeholder="Rechercher des articles par mots clés" aria-label="Search">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit"><font-awesome-icon icon="fa-solid fa-magnifying-glass" /></button>
            </form>
            <div class="col-2 d-flex flex-column dropDownMenu">
                <div class="dropdown">
                    <!-- Je rend dynamique avec v-bind l'affichage de l'image avec la donnée que je récupère de la requête API et que j'enregistre dans ma data "userPicture" du view-->
                    <a href="#" class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><img src="../assets/images/Sylvester_Stallone.jpeg" alt="" class="userPicture"></a>
                    <div class="dropdown-menu">
                        <router-link class="dropdown-item" to="/">Accueil</router-link>
                        <router-link class="dropdown-item" to="/profil">Profil</router-link>
                        <a href="#"  class="dropdown-item" @click="deconnectUser()">Déconnexion</a>
                    </div>
                </div>
                
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
            localStorage.removeItem("login");
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
.form-control {
    width: 80%;
    display: inline-block;
}

.logo {
    height: 50px;
    width: auto;
    object-fit: cover; 
}

.arrowDown {
    margin-top: auto;
    height: 15px;
    margin-left: -15px;
    width: auto;
}

.userPicture {
    height: 60px;
    width: 60px;
    border-radius: 50%;
    object-fit: cover;
    cursor: pointer;
}

.arrowDown {
    cursor: pointer;
}

.dropDownMenu {
    position: relative;
}

.routerNav {
    position: absolute;
    top: 68px;
    left: 0;
    z-index: 2;
    background-color: white;
    padding: 10px;
    padding-right: 40px;
    font-size: 15px;
    border-radius: 10px;
}

a {
    text-decoration: none;
}

</style>