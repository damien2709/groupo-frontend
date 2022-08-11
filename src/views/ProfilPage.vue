<template>
    <MyNav/>
    <div class="container rounded bg-white mt-5">
        <div class="row">
            <div class="col-md-4">
                <div class="d-flex flex-column align-items-center text-center mt-5 mb-4">
                    <!-- Je rend dynamique avec v-bind l'affichage de l'image avec la donnée que je récupère de la requête API et que j'enregistre dans ma data "userPicture" du view-->
                    <img :src="this.userPicture" id="userPicture" alt="user Profil" style="height: 120px width:auto; object-fit: cover;">
                </div>
                <div class="text-center">
                    <button class="btn btn-info profile-button" type="button" >Changer la photo</button>
                </div>
            </div>
            <div class="col-md-8 border-right">
                <div class="p-3 py-5">
                    <div class="d-flex justify-content-between align-items-center">
                        <h1 class="text-right">Profil utilisateur</h1>
                    </div>
                    <div class="row mt-2 text-start">
                        <div class="col-md-6"  >
                            <!-- Je vais afficher les données récupérées de la BDD sur le user dans les champs du formulaire, grace à l'attribut "value" de l'input et la directive "v-bind" de VueJS qui me permet d'afficher des valeurs dynamiques. Ensuite, si le status "modifyStatus est "false", il est impossible de modifier les champs car l'attribut "disabled" défini dynamiquement est actif grace au test conditionnel de savoir si "modifyStatus" est false ou true. Si le status est true, alors on peut modifier. -->
                            <label for="surname" class="col-form-label text-primary fw-bold">Prénom</label>
                            <input 
                            type="text" 
                            class="form-control"
                            id="surname"
                            v-bind:value= "this.surname" 
                            :disabled="modifyStatus ? false : true">
                        </div>
                        <div class="col-md-6">
                            <label for="name" class="col-form-label text-primary fw-bold">Nom</label>
                            <input type="text" 
                            class="form-control" 
                            id="name" 
                            v-bind:value= "this.name" 
                            :disabled="modifyStatus ? false : true">
                        </div>
                    </div>
                    <div class="row text-start">
                        <div class="col-md-12">
                            <label for="username" class="col-form-label text-primary fw-bold">Nom d'utilisateur</label>
                            <input type="text" 
                            class="form-control"
                            id="username" 
                            v-bind:value= "this.username" 
                            :disabled="modifyStatus ? false : true">
                        </div>
                        <div class="col-md-12">
                            <label for="email" class="col-form-label text-primary fw-bold">Email</label>
                            <input type="email" 
                            class="form-control" 
                            id="email"
                            v-bind:value= "this.email" 
                            :disabled="modifyStatus ? false : true">
                        </div>
                        <div class="col-md-12">
                            <label for="department" class="col-form-label text-primary fw-bold">Service</label>
                            <input type="text" 
                            class="form-control" 
                            id="department"
                            v-bind:value= "this.department" :disabled="modifyStatus ? false : true">
                        </div>
                        <div class="col-md-12">
                            <label for="tel" class="col-form-label text-primary fw-bold">Tel du poste</label>
                            <input type="tel" 
                            class="form-control" 
                            id="tel"
                            v-bind:value= "this.tel" 
                            :disabled="modifyStatus ? false : true">
                        </div>
                        
                    </div>
                    
                    <div class="mt-5 text-center d-flex justify-content-between">
                        <button 
                            class="btn btn-primary profile-button" 
                            type="button" 
                            v-if="modifyStatus == false"
                            @click="changeStatus()">
                            Modifier le profil
                        </button>
                        <button 
                            class="btn btn-primary profile-button" 
                            type="button" 
                            v-else
                            @click="updateAccount()">
                            Sauvegarder le profil
                        </button>
                        <button 
                        class="btn btn-danger profile-button" type="button">Supprimer le profil</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

  
</template>

<script>
/* Ici on ajoute les propriétés de données, les méthodes, les cycles de vie (hooks) */
import MyNav from '@/components/MyNav.vue' // import du composant

export default {
    name: 'ProfilPage',

    components: {
        MyNav
    },
    data() {
        return {
            userId: 0,
            token: '',
            userPicture: '',
            surname: '',
            name: '',
            username: '',
            email: '',
            department: '',
            tel: '',
            modifyStatus: false,

        }
    },

    //pour exécuter la méthode avant le lancement de la page, on va l'appeler dans le hook "created"
    created: function() {
        this.getTheProfilPage();
    },

    methods: {
        changeStatus: function () {
            this.modifyStatus = true;
        },
        getTheProfilPage: function (){
            let isLogged = JSON.parse(localStorage.getItem("login"));
            if(!isLogged) {
                this.$router.push('/login'); //ici je crée une redirection de page (de view) avec la méthode push du router. Le paramètre est le chemin de la route. 
            }
            else {
                this.token = JSON.parse(localStorage.getItem("token"));
                this.userId = JSON.parse(localStorage.getItem("userId"));
                this.getProfil();
            }
        }, 
        //je me connecte avec axios sur la route du profil en lui passant en paramètre la route, l'objet d'entête http avec le token.
        getProfil: function () {
            console.log(`je vois mon profil et le token : ${this.token}`);
            this.axios
                .get(`http://localhost:3000/api/users/${this.userId}`, 
                    {headers: 
                        { "Authorization": `Bearer ${this.token}`}
                    }
                )
                // je récupère la réponse de l'API, je charge dans le localStorage la clé/valeur "login" et la clé/valeur "token".
                .then(response => {
                    console.log(response.data);
                    this.surname = response.data.data.surname;
                    console.log(response.data.data.surname);
                    this.name = response.data.data.name;
                    this.username = response.data.data.username;
                    this.email = response.data.data.email;
                    this.department = response.data.data.department;
                    this.tel = response.data.data.tel;
                    this.userPicture = response.data.data.picture;

                })
                .catch((error) =>{
                    console.log(error.message);
                })
        },
        updateAccount: function () {
            this.modifyStatus = false; // je repasse le status de mofifier à false, pour empêcher de modifier les champs. 
        }

    },
}

</script>


<style scoped lang="scss">

#userPicture {
    height: 100%;
    width: 100%;
    border-radius: 50%;
    object-fit: cover;
}

.form-control:focus {
    box-shadow: none;
    border-color: #BA68C8
}

.profile-button {
    &:hover {
        background: #682773
    }
    &:focus {
        background: #682773;
        box-shadow: none
    }
    &:active {
        background: #682773;
        box-shadow: none
    }
}

</style>