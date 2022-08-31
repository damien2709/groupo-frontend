<template>
    <div class="container bg-white">
        <div class="row">
            <div class="famousPosts">
                <h3>Les plus populaires</h3>
            </div>
        </div>
        <div class="row wallOfPopularPosts">
<!-- CARD POST -->
            <!-- Je crée une boucle dans la list des posts avec la clé paramétrée sur "index" pour dire à la boucle sur quel item boucler. Pour les éléments créés qui seront modifiables individuellement, je dois leur attribuer des id dynamiques -->
            <div class="card cardPost text-start mb-3"  v-for="(item, id) in listOfPosts"  v-bind:key="id">

    <!-- CARD HEADER NOM USER + MENU POST - DROPDOWN-->
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
                                    <div class="modal-body" id='form' action="" method="post" enctype='multipart/form-data'>
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
                                                    <option :value="item.category" disabled>Catégorie</option>
                                                    <option>Fun</option>
                                                    <option>Entraide</option>
                                                    <option>Infos</option>
                                                    <option>Projet</option>
                                                </select>
                                            </div>
                                            <div class="mt-3 mx-auto" style="width: 75%;" >
                                                <p class="me-3 mt-2 text-start">Modifier l'image :</p>
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
                                        <!-- Surtout pas de bouton de type "submit" car ca bug avec Axios ! Il faur passer le type du button en "button" !!! Ici je passe en paramètres de la fonction l'ID du post (item) récupéré dans la boucle, puis les id dynamiques des inputs du titre, du content, de la catégorie, pour que le bon post soit modifié ! -->
                                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="modifyPost(item.id, 'titlePost'+item.id, 'contentPost'+item.id, 'categoryPost'+item.id, )">Modifier le post</button>
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
                    <div class="card-img-top">
                        <img :src="item.picture" alt="" class="postPicture">
                    </div>

    <!-- CARD BODY TITRE ET CONTENU POST -->
                    <div class="card-body bodyPost">
                        <h2 class="titlePost card-title fs-3">{{ item.title }}</h2>
                        <p class="contentPost card-text">{{ item.content }}</p>
                    </div>

    <!-- CARD FOOTER NOMBRE DE LIKES-->
                    <div class="like card-footer d-flex align-items-center">
                        <font-awesome-icon icon="fa-brands fa-gratipay" class="fa-gratipay"/>
                        <span class="countLike ms-2">{{ item.nbLike }}</span>
                    </div>

    <!-- CARD FOOTER LIKER ET COMMENTER -->
                    <div class="like card-footer d-flex align-items-stretch bg-white px-0 pt-1 pb-1 border-bottom">
                        <div class="d-flex align-items-center toLike w-50 justify-content-center py-1" :id="'like'+item.id" :class="doLike(item.usersLike) ? 'text-primary' : '' " @click="addLike(item.id, `like${item.id}`, item)">
                            <font-awesome-icon icon="fa-solid fa-heart" class="fa-heart-solid"/>
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
                            <img src="http://localhost:3000/images/unknownUser.jpg" id="userPicture" alt="user Profil" class="me-2"/>
                            <p class="contentPost card-text bg-light py-2 px-4">{{ item.content }}</p>
                        </div>
                    </div>

    <!-- CARD FOOTER ECRIRE UN COMMENTAIRE -->
                    <div class="like card-footer d-flex bg-white">
                        <img :src="userPicture" id="userPicture" alt="user Profil" class="me-2"/>
                        <input class="form-control inputComment" type="text" placeholder="Écrivez un commentaire">
                    </div>
                </div>  
            </div>
    </div>
  
</template>

<script>
export default {
    name: 'FamousPosts',

    mounted: function () {
        this.getListOfPopularPosts();
    }, 

    methods: {
        // Fonction pour récupérer et afficher la liste des posts
        getListOfPopularPosts: function () {
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
                        this.postPicture = this.listOfPosts.picture;
                        console.log(this.listOfPosts);
                    })
                    .catch((error) =>{
                        console.log(error.message);
                    }) 
            
        }, 
    }

}
</script>

<style scoped lang="scss">

</style>