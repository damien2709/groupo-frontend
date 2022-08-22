<template>
    <div class="container px-0">
            <div class="row wallOfPosts">

<!-- CARD POST -->
                <!-- Je crée une boucle dans la list des posts avec la clé paramétrée sur "index" pour dire à la boucle sur quel item boucler. Pour les éléments créés qui seront modifiables individuellement, je dois leur attribuer des id dynamiques -->
                <div class="card cardPost text-start mb-3"  v-for="(item) in listOfPosts"  v-bind:key="item.id">

    <!-- CARD HEADER NOM USER + MENU POST-->
                    <div class="card-header d-flex justify-content-between">
                        <div class="d-flex align-items-center">
                            <img src="../../../backend/images/unknownUser.jpg" id="userPicture" alt="user Profil"/>
                            <p class="authorPost ms-3 mb-0">{{ item.authorSurname }} {{item.authorName}}</p>
                        </div>
                        <div v-if="item.authorId == this.userId">
                            <!-- Ici je crée un bouton dropdown menu avec Bootstrap pour modifier ou supprimer le post, uniquement si le post appartient au user (v-if="item.authorId == this.userId").-->
                            <div class="dropdown">
                                <a href="#" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img class="menuImage" src="../assets/images/dots.png" alt="">
                                </a>
                                <!-- Pour que chaque modal soit bien associé au dropdown de chaque item, (et pas un dropdown unique pour l'ensemble des posts!) il faut générer pour chaque modal un id dynamique basé sur l'id du post ():id="'modPost'+item.id"), puis lui associer le lien qui l'active reprenant comme targe l'id dynamique (:data-bs-target="'#modPost'+item.id") ! -->
                                <div class="dropdown-menu">
                                    <a href="" class="dropdown-item" data-bs-toggle="modal" :data-bs-target="'#modPost'+item.id">Modifier l'article</a>
                                    <a href="" class="dropdown-item" data-bs-toggle="modal" :data-bs-target="'#suppPost'+item.id">Supprimer l'article</a>
                                </div>
                            </div>
                        </div>
                        <!-- Modal Modification article. Il doit avoir un id dynamique pour correspondre à son lien qui est attaché à chaque post.-->
                        <div class="modal fade" :id="'modPost'+item.id" tabindex="-1" aria-labelledby="modificationPost" aria-hidden="true">
                            <div class="modal-dialog" >
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title">Modifier la publication</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <!-- J'utilise ':value="item.x"' pour afficher le contenu de chaque post dans les champs du formulaire. Les id des champs sont dynamiques pour afficher le contenu de chaque post issu de la boucle. -->
                                    <div class="modal-body">
                                        <form class="form mt-3 mb-5 ">
                                            <div class=" d-flex text-center">
                                                <input type="text" :id="'titlePost'+item.id" class="form-control title mt-3 mx-auto" style="width: 75%;" :value="item.title" placeholder="Titre">
                                            </div>
                                            <div>
                                                <textarea type="text" :id="'contentPost'+item.id" class="form-control content mt-3 mx-auto" style="width: 75%;" :value="item.content" placeholder="Ecrivez votre article !"></textarea>
                                            </div>
                                            <div class="mx-auto text-start" style="width: 75%;">
                                                <p class="me-3 mt-2">Choisissez une catégorie : </p>
                                                <select :value="item.category" :id="'categoryPost'+item.id" class="form-select mt-3">
                                                    <option value="" disabled>Catégorie</option>
                                                    <option>Fun</option>
                                                    <option>Entraide</option>
                                                    <option>Infos</option>
                                                    <option>Projet</option>
                                                </select>
                                            </div>
                                        </form>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                                        <!-- Surtout pas de bouton de type "submit" car ca bug avec Axios ! Il faur passer le type du button en "button" !!! Ici je passe en paramètres de la fonction l'ID du post (item) récupéré dans la boucle, puis les id dynamiques des inputs du titre, du content, de la catégorie, pour que le bon post soit modifié ! -->
                                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="modifyPost(item.id, 'titlePost'+item.id, 'contentPost'+item.id, 'categoryPost'+item.id)">Modifier le post</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Modal suppression article. Il doit avoir un id dynamique pour correspondre à son lien qui est attaché à chaque post. -->
                        <div class="modal fade" :id="'suppPost'+item.id" tabindex="-1" aria-labelledby="suppressionPost" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="">Êtes-vous sûr(e) ?</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <p>Voulez-vous vraiment supprimer cet article ?</p>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="deletePost(item.id)">Supprimer</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

    <!-- CARD IMAGE -->
                    <div class="card-img-top"></div>

    <!-- CARD BODY TITRE ET CONTENU POST -->
                    <div class="card-body bodyPost">
                        <h2 class="titlePost card-title fs-3">{{ item.title }}</h2>
                        <p class="contentPost card-text">{{ item.content }}</p>
                    </div>

    <!-- CARD FOOTER NOMBRE DE LIKES-->
                    <div class="like card-footer d-flex align-items-center">
                        <font-awesome-icon icon="fa-brands fa-gratipay" class="fa-gratipay"/>
                        <span class="countLike ms-2">{{ item.like }}</span>
                    </div>

    <!-- CARD FOOTER LIKER ET COMMENTER -->
                    <div class="like card-footer d-flex align-items-stretch bg-white px-0 pt-1 pb-1 border-bottom">
                        <div class="d-flex align-items-center toLike w-50 justify-content-center py-1" >
                            <font-awesome-icon icon="fa-regular fa-heart" class="fa-heart"/>
                            <span class="jaime ms-3">J'aime</span>
                        </div>
                        <div class="d-flex align-items-center toComment w-50 justify-content-center" >
                            <font-awesome-icon icon="fa-regular fa-message" />
                            <span class="jaime ms-3">Commenter</span>
                        </div>
                    </div>

    <!-- CARD BODY AFFICHAGE COMMENTAIRES-->
                    <div class="card-body commentPost w-75 ps-5">
                        <div class="d-flex">
                            <img src="../assets/images/unknownUser.jpg" id="userPicture" alt="user Profil" class="me-2"/>
                            <p class="contentPost card-text bg-light py-2 px-4">{{ item.content }}</p>
                        </div>
                    </div>

    <!-- CARD FOOTER ECRIRE UN COMMENTAIRE -->
                    <div class="like card-footer d-flex bg-white">
                        <img src="../assets/images/Sylvester_Stallone.jpeg" id="userPicture" alt="user Profil" class="me-2"/>
                        <input class="form-control inputComment" type="text" placeholder="Écrivez un commentaire">
                    </div>
                </div>  
            </div>
    </div>
  
</template>

<script>

export default {
    name: 'AllPosts',
    data () {
        return {
            listOfPosts : [],
            token: JSON.parse(localStorage.getItem("token")),
            thatsMyArticle: false,
            userId: JSON.parse(localStorage.getItem("userId")),
            titlePost: '',
            contentPost: '',
            categoryPost: '',
        }
    },
    components: {

    },
        //pour exécuter la méthode avant le lancement de la page, on va l'appeler dans le hook "created"
    created: function() {
        this.getListOfPosts();
    },

    methods: {
        // Fonction pour récupérer et afficher la liste des posts
        getListOfPosts: function () {
            this.axios
                .get('http://localhost:3000/api/posts', 
                    {headers: 
                        { "Authorization": `Bearer ${this.token}`}
                    }
                )
                // je récupère la réponse de l'API, je charge dans le localStorage la clé/valeur "login" et la clé/valeur "token".
                .then(response => {
                    console.log(response.data);
                    this.listOfPosts = response.data.data;

                    console.log(response.data);
                })
                .catch((error) =>{
                    console.log(error.message);
                })
        }, // Je vais appeler cette méthode en utilisant les doubles accolades dans l'élément HTML concerné. 

        // Fonction de modification d'un post où l'ID de la carte correspond à l'ID du post. EN paramètre de la fonction, je passerais  le "item.id" récupéré dans la boucle for de l'élément HTML. 
        modifyPost: function (para, title, content, category) {
            this.axios
                .put(`http://localhost:3000/api/posts/${para}`, 
                    {
                        title: document.getElementById(`${title}`).value, // ici on va utiliser getElement car v-model ne fonctionne pas en même tempa que v-bind dans un input. 
                        content: document.getElementById(`${content}`).value,
                        category: document.getElementById(`${category}`).value,
                    },
                    {headers: 
                        { "Authorization": `Bearer ${this.token}`}
                    }
                )
                // je récupère la réponse de l'API, je charge dans le localStorage la clé/valeur "login" et la clé/valeur "token".
                .then(response => {
                    console.log(response.data);
                    this.$router.go();
                })
                .catch((error) =>{
                    console.log(error.message);
                })
        },
        deletePost: function (para) {
            this.axios
                .delete(`http://localhost:3000/api/posts/${para}`, 
                    {headers: 
                        { "Authorization": `Bearer ${this.token}`}
                    }
                )
                .then(response => {
                    console.log(response.data.message);
                    this.$router.go(); // pour enlever le modal qui est bloqué suite à la supression du profil. Pas besoin de renvoyer vers la page login, comme l'utilisateur n'est plus connecté, il y est automatiquement redirigé   
                })
                .catch(error => {
                    console.log(error.message);
                })
        }
    }
}

</script>

<style scoped lang="scss">

.famousPosts {
    width: 29%;
}

#userPicture {
    height: 35px;
    width: 35px;
    border-radius: 50%;
    object-fit: cover;
}

.card {
    box-shadow: 1px 1px 3px rgb(220, 219, 219);
    border-radius: 5px;
    border: none;
    padding: 8px;
    
}

.card-img-top{
        height: auto;
}

.menuImage {
    height: 20px;
    width: auto;
}

.fa-gratipay {
    color: red;
}

.toLike,
.toComment {
    cursor: pointer;
}

.toLike:hover {
    background-color: rgb(240, 249, 255);
}

.toComment:hover {
    background-color: rgb(240, 249, 255);
}

.countLike {
    font-size: 14px;
    margin-top: 2px;
}

.inputComment {
    border-radius: 15px;
    background-color: rgba(0,0,0,.03);
}

.contentPost {
    border-radius: 25px;
}

</style>