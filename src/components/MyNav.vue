<template>
    <div class="container-fluid MyNav">
        <nav class=" row navbar justify-content-space-between" style="background-color: #e3f2fd;">
            <a class="navbar-brand logoNavbar col-3" href="#">
                <img src="../assets/images/logo_groupo.png" class="logo d-inline-block align-top" alt="groupomania logo">
            </a>
            <form class="form-inline col-6">
                <input class="form-control mr-sm-2" type="search" placeholder="Rechercher des articles par mots clés" aria-label="Search">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit"><font-awesome-icon icon="fa-solid fa-magnifying-glass" /></button>
            </form>
            <div class="col-2 d-flex flex-column">
                <div 
                    class="monProfil text-start d-flex align-item-end">
                    <!-- Je rend dynamique avec v-bind l'affichage de l'image avec la donnée que je récupère de la requête API et que j'enregistre dans ma data "userPicture" du view-->
                    <img :src="this.userPicture" id="userPicture" alt="user Profil" @click="dropdownTheMenu()">
                    <img src="../assets/images/down-filled-triangular-arrow.png" alt="" class="arrowDown rounded" style="background-color: white; padding: 2px;" @click="dropdownTheMenu()">
                </div>
                <div class="routerNav d-flex flex-column text-start" v-if="seeMenu == true">
                    <router-link to="/">Accueil</router-link>
                    <router-link to="/profil">Profil</router-link>
                    <a href=""  @click="deconnectUser()">Se déconnecter</a>
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
        seeMenu: false,
    }
  },

    //pour exécuter la méthode avant le lancement de la page, on va l'appeler dans le hook "created"
    created: function() {
        this.getProfilPicture();
    },

  methods: {
        dropdownTheMenu : function () {
            this.seeMenu = !this.seeMenu;
            console.log(this.seeMenu);
        },
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

#userPicture {
    height: 60px;
    width: 60px;
    border-radius: 50%;
    object-fit: cover;
    cursor: pointer;
}

.arrowDown {
    cursor: pointer;
}

.routerNav {
    position: absolute;
    top: 70px;
    background-color: #e3f2fd;
    padding: 10px;
}


</style>