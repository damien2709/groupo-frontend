<!-- Composant pour créer un post -->
<template>
    <!-- Barre de création de post sous forme d'input-->
    <div class="container d-flex my-2 p-3 bg-white" >
        <img :src="userPicture" id="userPicture" alt="USER" class="me-2"/>
        <input class="inputPost w-100 p-2" data-bs-toggle="modal" data-bs-target="#creationPost" :placeholder=" 'Quoi de neuf' + ' '+ this.userSurname + ' ?'">
        <!-- Modal formulaire de création de post-->
        <div class="modal fade" id="creationPost" tabindex="-1" aria-labelledby="creationPost" aria-hidden="true">
            <div class="modal-dialog" >
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Créer une publication</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form class="form mt-3 mb-5" id='form' action="" method="post" enctype='multipart/form-data'>
                            <div class=" d-flex text-center">
                                <input 
                                type="text" 
                                class="form-control title mt-3 mx-auto" 
                                style="width: 75%;" 
                                v-model="title" 
                                name="title"
                                placeholder="Titre">
                            </div>
                            <div class="required d-flex w-75 mx-auto">
                                <textarea 
                                type="text" 
                                class="form-control content mt-3 mx-auto"  
                                v-model="content" 
                                name="content"
                                required
                                placeholder="Ecrivez votre article !"></textarea>
                            </div>
                            <div class="mx-auto text-start" style="width: 75%;">
                                <p class="me-3 mt-2 required d-flex">Choisissez une catégorie : </p>
                                <select 
                                v-model="category"
                                name="category" 
                                required
                                class="form-select mt-3">
                                    <option value="" disabled>Catégorie</option>
                                    <option>Fun</option>
                                    <option>Entraide</option>
                                    <option>Infos</option>
                                    <option>Projet</option>
                                </select>
                            </div>
                            <div class="mt-3 mx-auto" style="width: 75%;" >
                                <p class="me-3 mt-2 text-start">Sélectionner une image :</p>
                                <input 
                                type="file" 
                                class="form-control mt-3 mx-auto" 
                                id="picture" 
                                name="picture"
                                @change="onFileUpload">
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                        <!-- Surtout pas de bouton de type "submit" car ca bug avec Axios ! Il faur passer le type du button en "button" !!!-->
                        <button 
                        type="button" 
                        class="btn btn-primary"
                        :class="{'disabled' : !validatedFields}" 
                        @click="createPost()">Créer le post</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'BarreCreationPost',

    data () {
        return {
            token: JSON.parse(localStorage.getItem("token")),
            userId: JSON.parse(localStorage.getItem("userId")),
            userPicture: '',
            userSurname: '',
            postPicture: '',
            title: "",
            content: "",
            category: "",
            nbLike: 0, 
            showModal: false,
        }
    },

    computed: {
        // Vérification des champs du formulaire
        validatedFields: function () {
                if(this.content != "" && this.category != "") {
                    return true;
                }
                else {
                    return false;
                }
            }
    },

    mounted: function() {
        this.getProfil();
    },

    methods: {
        // Pour récupérer le fichier de l'input de type file associé
        onFileUpload: function (event) {
            this.postPicture = event.target.files[0]
        },
        // pour récupérer et afficher les infos du profil 
        getProfil: function () {
            this.axios
                .get(`http://localhost:3000/api/users/${this.userId}`, 
                    {headers: 
                        { "Authorization": `Bearer ${this.token}`}
                    }
                )
                .then(response => {
                    this.userPicture = response.data.data.picture;
                    this.userSurname = response.data.data.surname;
                })
                .catch((error) =>{
                    console.log(error.message);
                })
        },
        // Fonction pour créer un post
        createPost: function () {
        this.axios
            .post('http://localhost:3000/api/posts', 
                {
                    title: this.title,
                    content: this.content,
                    category: this.category,
                    nbLike: this.nbLike,
                    picture: this.postPicture,
                    userId: this.userId, // pour le token
                },
                {headers: 
                    { 
                        "Authorization": `Bearer ${this.token}`,
                         "Content-Type": 'multipart/form-data'
                    }
                }
            )
            .then(response => {
                    console.log(response.data.message);
                    this.showModal = false;
                    this.$router.go();
                }      
            )
            .catch((error) =>{
                console.log(error.message);
            })

        }
    }

}
</script>

<style scoped lang="scss">
.createPost {
    margin-top: 20vh;
}

.inputPost {
    cursor : text;
    border-radius: 15px;
    border: 1px solid rgb(202, 202, 202);
    &:hover {
        background-color: aliceblue;
    } 
}

.container {
    border-radius: 5px;
    box-shadow: 3px 3px 3px rgb(220, 219, 219);
}

#userPicture {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    object-fit: cover;
}

.required::after {
    content: "*";
    color: red;
    margin-left: 2px;
    margin-right: 2px;
    padding-top: 5px;
}

</style>



