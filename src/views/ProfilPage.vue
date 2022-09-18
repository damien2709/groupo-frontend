<template>
    <BarreNav/>
    <div class="container rounded bg-white p-5 w-75">
        <div class="row ">
            <div class="col-12 d-flex justify-content-center align-items-center">
                <h1>Profil utilisateur</h1>
                <div class=" photo-utilisateur col-md-6  mb-4 text-end">
                    <!-- Je rend dynamique avec v-bind l'affichage de l'image avec la donnée que je récupère de la requête API et que j'enregistre dans ma data "userPicture" du view-->
                    <img :src="this.userPicture" id="userPicture" alt="user Profil">
                </div> 
            </div>
            <form class="form d-flex flex-wrap" id='form' action="" method="put" enctype='multipart/form-data'>
                <div class="infos-utilisateur col-12 col-lg-8 ps-3">
                    <div class="row g-2"  >
                    <!--Je vais afficher les données récupérées de la BDD sur le user dans les champs du formulaire, grace à l'attribut "value" de l'input et la directive "v-bind" de VueJS qui me permet d'afficher des valeurs dynamiques. Ensuite, si le status "modifyStatus est "false", il est impossible de modifier les champs car l'attribut "disabled" défini dynamiquement est actif grace au test conditionnel de savoir si "modifyStatus" est false ou true. Si le status est true, alors on peut modifier. -->
                        <div class="col">
                            <label for="surname" class="col-form-label text-primary fw-bold ">Prénom</label>
                            <input 
                                type="text" 
                                class="form-control"
                                id="surname"
                                name="surname"
                                v-bind:value= "this.surname" 
                                :disabled="modifyStatus ? false : true">
                        </div>
                        <div class="col">
                            <label for="name" class="col-form-label text-primary fw-bold">Nom</label>
                            <input 
                                type="text" 
                                class="form-control" 
                                id="name"
                                name="name" 
                                v-bind:value= "this.name" 
                                :disabled="modifyStatus ? false : true">
                        </div>
                    </div>
                    <div class="row text-start">
                        <div class="col-md-12">
                            <label for="email" class="col-form-label text-primary fw-bold">Email</label>
                            <input type="email" 
                            class="form-control" 
                            id="email"
                            name="email"
                            v-bind:value= "this.email" 
                            :disabled="modifyStatus ? false : true">
                        </div>
                        <div class="col-md-12">
                            <label for="department" class="col-form-label text-primary fw-bold">Service</label>
                            <input type="text" 
                            class="form-control" 
                            id="department"
                            name=" department"
                            v-bind:value= "this.department" :disabled="modifyStatus ? false : true">
                        </div>
                        <div class="col-md-12">
                            <label for="tel" class="col-form-label text-primary fw-bold">Tel du poste</label>
                            <input type="tel" 
                            class="form-control" 
                            id="tel"
                            name="tel"
                            v-bind:value= "this.tel" 
                            :disabled="modifyStatus ? false : true">
                        </div> 
                        <div class="d-flex align-items-center">
                            <div class="col-md-6">
                                <label for="picture" class="col-form-label text-primary fw-bold" v-if="modifyStatus == true">Changer la photo du profil</label>
                                <input type="file" 
                                class="form-control" 
                                id="picture"
                                name="picture"
                                v-if="modifyStatus == true"
                                @change="onFileUpload">
                            </div>  
                        </div>    
                    </div>
                    
                    <div class="text-start mt-5">
                        <button 
                        class="btn btn-primary profile-button" 
                        type="button" 
                        v-if="modifyStatus == false"
                        @click="changeStatus()">
                        Modifier le profil
                        </button>
                        <!-- Surtout pas de bouton de type "submit" car ca bug avec Axios ! Il faur passer le type du button en "button" !!!-->
                        <div v-else>
                            <button 
                        class="btn btn-primary profile-button me-3" 
                        type="button" 
                        @click="updateAccount()">
                            Sauvegarder le profil
                            </button>
                            <button 
                        class="btn btn-secondary profile-button" 
                        type="button" 
                        @click="changeStatus()">
                            Annuler
                            </button>
                        </div>
                    </div>
                </div>
                <div class="photo-delete col-12 col-lg-4">
                    <div class="bouton-delete mt-2 text-end">
                        <button
                            class="btn btn-danger" 
                            data-bs-toggle="modal" data-bs-target="#confirmationDeleteAccount" 
                            type="button">Supprimer le profil
                        </button>
                        <!-- Modal -->
                        <div class="modal fade" id="confirmationDeleteAccount" tabindex="-1" aria-labelledby="confirmationDeleteAccount" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="">Êtes-vous sûr(e) ?</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <p>Voulez-vous vraiment supprimer votre compte ?</p>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="deleteAccount()">Supprimer</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
/* Ici on ajoute les propriétés de données, les méthodes, les cycles de vie (hooks) */
import BarreNav from '@/components/BarreNav.vue' // import du composant

export default {
    name: 'ProfilPage',

    components: {
        BarreNav
    },
    data() {
        return {
            userId: '',
            token: '',
            picture: '',
            surname: '',
            name: '',
            email: '',
            department: '',
            tel: '',
            modifyStatus: false,
            userPicture: '',
        }
    },

    //pour exécuter la méthode avant le montage de la page, on va l'appeler dans le hook "created"
    created: function() {
        this.getTheProfilPage();
    },

    methods: {
        // pour rendre les inputs  modifiables en cas de modification de compte
        changeStatus: function () {
            this.modifyStatus = !this.modifyStatus;
        },
        // Une méthode pour indiquer que le user veut changer sa photo
        modifyPictureTrue: function () {
            this.changePicture = true;
        },
        onFileUpload: function (event) {
          this.userPicture = event.target.files[0]
        },
        // Pour vérifier si le user est bien loggé et peut accèder à la page et peut afficher son profil
        getTheProfilPage: function (){
            let isLogged = JSON.parse(localStorage.getItem("login"));
            if(isLogged == false) {
                this.$router.push('/login'); //ici je crée une redirection de page (de view) avec la méthode push du router. Le paramètre est le chemin de la route. 
            }
            else {
                this.token = JSON.parse(localStorage.getItem("token"));
                this.userId = JSON.parse(localStorage.getItem("userId"));
                this.getProfil();
            }
        }, 
        // pour récupérer et afficher les infos du profil : je me connecte avec axios sur la route du profil en lui passant en paramètre la route, l'objet d'entête http avec le token.
        getProfil: function () {
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
                    this.email = response.data.data.email;
                    this.department = response.data.data.department;
                    this.tel = response.data.data.tel;
                    this.userPicture = response.data.data.picture;
                })
                .catch((error) =>{
                    console.log(error.message);
                })
        },
        // Une fonction pour mettre à jour les informations de son compte
        updateAccount : function () {
            console.log(this.token);
                this.surname = document.getElementById('surname').value;
                this.name = document.getElementById('name').value;
            this.axios
                .put(`http://localhost:3000/api/users/${this.userId}`, 
                    {
                        surname: this.surname, // ici on va utiliser getElement car v-model ne fonctionne pas en même tempa que v-bind dans un input. 
                        name: this.name,
                        email: document.getElementById('email').value, 
                        department: document.getElementById('department').value,
                        tel: document.getElementById('tel').value,
                        picture: this.userPicture,
                    },
                    {headers: 
                        { 
                        'Authorization': `Bearer ${this.token}`,
                        'Content-Type': 'multipart/form-data'
                        }
                    }
                )
                // je récupère la réponse de l'API, je charge dans le localStorage la clé/valeur "login" et la clé/valeur "token".
                .then(response => {
                    console.log(response.data);
                    localStorage.setItem('userSurname', JSON.stringify(this.surname));
                    localStorage.setItem('userName', JSON.stringify(this.name));
                    this.modifyStatus = false;
                    this.$router.go();
                })
                .catch((error) =>{
                    console.log(error.message);
                })
        },
        // Une fonction pour supprimer son compte
        deleteAccount: function () {
                this.axios
                    .delete(`http://localhost:3000/api/users/${this.userId}`,
                        {headers: 
                            { "Authorization": `Bearer ${this.token}`}
                        }
                    )
                    .then(response => {
                        console.log(response.data.message);
                        localStorage.removeItem("token");
                        localStorage.removeItem("login");
                        localStorage.removeItem("userId");
                        localStorage.removeItem("userName");
                        localStorage.removeItem("userSurname");
                        this.$router.push('/login'); // pour enlever le modal qui est bloqué suite à la supression du profil. Pas besoin de renvoyer vers la page login, comme l'utilisateur n'est plus connecté, il y est automatiquement redirigé   
                    })
                    .catch(error => {
                        console.log(error.message);
                    })
            }
     }
}
        
</script>


<style scoped lang="scss">

#userPicture {
    height: 80px;
    width: 80px;
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

