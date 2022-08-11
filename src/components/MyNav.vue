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
           
            <div class="buttonsGroup col-md-3">
                    <button type="button" class="btn btn-primary" @click="deconnectUser()">Se déconnecter</button>
            </div>
            <div class="routerNav">
        <router-link to="/">Accueil</router-link> |
        <router-link to="/profil">Profil</router-link> |
        <router-link to="/login">Login</router-link>
            </div>
        </nav>
    </div>
    
</template>

<script>

export default {
  name: 'MyNav',
  data () {
    return {
        isLogged: '',
        token: '',
    }
  },

  methods: {
        deconnectUser: function () {
            this.isLogged = false;
            localStorage.setItem("login", JSON.stringify(this.isLogged));
            console.log(this.isLogged);
            let token = this.token;
            localStorage.setItem("token", JSON.stringify(token));
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