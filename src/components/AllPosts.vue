<template>
    <div class="container px-0">
        <div class="row categories p-2 mb-2 d-flex justify-content-between" style="background: #4E5166;">
            <div class="col-8 px-0 text-start">
                <button class="btn btn-primary me-2 " @click="setCatPost('Infos')">Infos</button>
                <button class="btn btn-primary me-2 " @click="setCatPost('Projets')">Projets</button>
                <button class="btn btn-primary me-2 " @click="setCatPost('Entraide')">Entraide</button>
                <button class="btn btn-primary me-2 " @click="setCatPost('Fun')">Fun</button>
                <button class="btn btn-primary me-2 " @click="setCatPostAll()">Toutes</button>
                <button class="btn btn-primary me-2 " @click="setCatPost('Projets')">Populaires</button>
                <p v-if="noPost == true" class="mt-2">Il n'y a pas d'article pour le moment !</p>
            </div>
            <div class="col-4 px-0 text-end">
                <button class=" btn btn-success" @click="setCatPost('Infos')">Mes posts</button>
                
            </div>
        </div>
        <div class="row wallOfPosts">
<!-- CARD POST -->
            <!-- Je crée une boucle dans la list des posts avec la clé paramétrée sur "index" pour dire à la boucle sur quel item boucler. Pour les éléments créés qui seront modifiables individuellement, je dois leur attribuer des id dynamiques -->
            <div class="card cardPost text-start mb-3"  v-for="(item, idx) in listOfPosts"  v-bind:key="idx">

    <!-- CARD HEADER NOM USER + MENU POST - DROPDOWN-->
                    <div class="card-header d-flex justify-content-between">
                        <div class="d-flex align-items-center">
                            <p>{{ searchAuthor(item.user_id) }}</p>
                            <img :src="this.authorPicture" class="authorPicture" alt="author Profil"/>
                            <p class="authorPost ms-3 mb-0">  {{ authorSurname }} {{authorName}}</p>
                        </div>
                        <div v-if="item.user_id == this.userId">
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
                            <img src="http://localhost:3000/images/unknownUser.jpg" class="authorPicture me-2" alt="user Profil"/>
                            <p class="contentPost card-text bg-light py-2 px-4">{{ item.content }}</p>
                        </div>
                    </div>

    <!-- CARD FOOTER ECRIRE UN COMMENTAIRE -->
                    <div class="like card-footer d-flex bg-white">
                        <img :src="userPicture" class="authorPicture me-2" alt="user Profil"/>
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
            listOfUsers: [],
            author: {},
            token: JSON.parse(localStorage.getItem("token")),
            thatsMyArticle: false,
            userId: JSON.parse(localStorage.getItem("userId")),
            titlePost: '',
            contentPost: '',
            categoryPost: '',
            usersLike: [],
            userPicture: '',
            postPicture: '',
            authorPicture: '',
            authorSurname: '',
            authorName:'',
            url: '',
            noPost: false,
        }
    },
    components: {

    },
        //pour exécuter la méthode après le montage de la page, on va l'appeler dans le hook "mounted"
    mounted: function() {
        this.getListOfPosts();
        this.getProfil();
        this.getListOfUsers();
    },

    methods: {
        setCatPost: function (para){
            this.url = `http://localhost:3000/api/posts?category=${para}`;
            this.getListOfPosts();
        },   
        setCatPostAll: function (){
            this.url = `http://localhost:3000/api/posts`;
            this.getListOfPosts();
        },    // Pour récupérer le fichier de l'input de type file associé
        onFileUpload: function (event) {
            this.postPicture = event.target.files[0]
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
                    this.userPicture = response.data.data.picture;
                })
                .catch((error) =>{
                    console.log(error.message);
                })
        },
        // On récupère la liste des utilisateurs
        getListOfUsers: function() {
            this.axios
                .get(`http://localhost:3000/api/users/`, 
                    {headers: 
                        { "Authorization": `Bearer ${this.token}`}
                    }
                )
                // je récupère la réponse de l'API qui sera la liste des users. Je filtre ensuite l'utilisateur dans le tableau par son id. 
                .then(response => {
                    this.listOfUsers = response.data.data;
                })
                .catch((error) =>{
                    console.log(error.message);
                })
        },
        searchAuthor: function (para) {
                    this.author = this.listOfUsers.filter(user => user.id == para);
                    this.authorPicture = this.author[0].picture;
                    this.authorName = this.author[0].name;
                    this.authorSurname = this.author[0].surname;
        },
        // Fonction pour récupérer et afficher la liste des posts
        getListOfPosts: function () {
            if(this.url == 'http://localhost:3000/api/posts?category=Infos') {
            this.axios
                .get(this.url, 
                    {headers: 
                        { "Authorization": `Bearer ${this.token}`}
                    }
                )
                // je récupère la réponse de l'API, je charge dans le localStorage la clé/valeur "login" et la clé/valeur "token".
                .then(response => {
                    console.log(response.data);
                    this.listOfPosts = response.data.data.filter(post => post.category == "Infos");
                    this.postPicture = this.listOfPosts.picture;
                    console.log(this.listOfPosts);
                    if(this.listOfPosts.length == 0){
                        this.noPost = true;
                    }
                    else{
                        this.noPost = false;
                    }
                })
                .catch((error) =>{
                    console.log(error.message);
                }) 
            }
            else if(this.url == 'http://localhost:3000/api/posts?category=Projets') {
            this.axios
                .get(this.url, 
                    {headers: 
                        { "Authorization": `Bearer ${this.token}`}
                    }
                )
                // je récupère la réponse de l'API, je charge dans le localStorage la clé/valeur "login" et la clé/valeur "token".
                .then(response => {
                    console.log(response.data);
                    this.listOfPosts = response.data.data.filter(post => post.category == "Projets");
                    this.postPicture = this.listOfPosts.picture;
                    console.log(this.listOfPosts);
                    if(this.listOfPosts.length == 0){
                        this.noPost = true;
                    }
                    else{
                        this.noPost = false;
                    }
                })
                .catch((error) =>{
                    console.log(error.message);
                }) 
            }
            else if(this.url == 'http://localhost:3000/api/posts?category=Entraide') {
            this.axios
                .get(this.url, 
                    {headers: 
                        { "Authorization": `Bearer ${this.token}`}
                    }
                )
                // je récupère la réponse de l'API, je charge dans le localStorage la clé/valeur "login" et la clé/valeur "token".
                .then(response => {
                    console.log(response.data);
                    this.listOfPosts = response.data.data.filter(post => post.category == "Entraide");
                    this.postPicture = this.listOfPosts.picture;
                    console.log(this.listOfPosts);
                    if(this.listOfPosts.length == 0){
                        this.noPost = true;
                    }
                    else{
                        this.noPost = false;
                    }
                })
                .catch((error) =>{
                    console.log(error.message);
                }) 
            }
            else if(this.url == 'http://localhost:3000/api/posts?category=Fun') {
            this.axios
                .get(this.url, 
                    {headers: 
                        { "Authorization": `Bearer ${this.token}`}
                    }
                )
                // je récupère la réponse de l'API, je charge dans le localStorage la clé/valeur "login" et la clé/valeur "token".
                .then(response => {
                    console.log(response.data);
                    this.listOfPosts = response.data.data.filter(post => post.category == "Fun");
                    this.postPicture = this.listOfPosts.picture;
                    console.log(this.listOfPosts);
                    if(this.listOfPosts.length == 0){ // si la liste des posts de la catégorie est vide, j'affiche que la liste est vide 
                        this.noPost = true;
                    }
                    else{
                        this.noPost = false;
                    }
                })
                .catch((error) =>{
                    console.log(error.message);
                }) 
            }
            else {
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
                        if(this.listOfPosts.length == 0){
                            this.noPost = true;
                        }
                        else{
                            this.noPost = false;
                    }
                    })
                    .catch((error) =>{
                        console.log(error.message);
                    }) 
            }
        }, 

        // Fonction de modification d'un post où l'ID de la carte correspond à l'ID du post. EN paramètre de la fonction, je passerais  le "item.id" récupéré dans la boucle for de l'élément HTML. 
        modifyPost: function (para, title, content, category) {
            this.axios
                .put(`http://localhost:3000/api/posts/${para}`, 
                    {
                        title: document.getElementById(`${title}`).value, // ici on va utiliser getElement car v-model ne fonctionne pas en même tempa que v-bind dans un input. 
                        content: document.getElementById(`${content}`).value,
                        category: document.getElementById(`${category}`).value,
                        picture: this.postPicture,
                    },
                    {headers: 
                        { 
                            "Authorization": `Bearer ${this.token}`,
                            "Content-Type": 'multipart/form-data'
                        }
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

        // Fonction de suppression d'un post. 
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
        },
        // Fonction d'ajout ou de suppression du user du tableau des likers de post. Permet de savoir qui aime tel ou tel post et d'afficher la liste des likers
        addLike: function (para, id, para2) {
            // Je fais une requête GET pour vérifier si le user like déjà cet article ou pas.
            this.axios
                .get(`http://localhost:3000/api/posts/${para}`, 
                    {headers: 
                        { "Authorization": `Bearer ${this.token}`}
                    }
                )
                // je récupère la réponse de l'API, 
                    .then( (response) => {
                        this.usersLike = response.data.data.usersLike; // je récupère le tableau des likers
                        let myIndex = this.usersLike.indexOf(this.userId); // je cherche si le userId est présente dans le tableau.
                        // S'il' n'existe pas, ça renvoie -1, et donc je vais ajouter l'utilisateur dans la liste des likers et je vais incrémenter nbLike puis enregistrer le tout dans la BDD. 
                            if (myIndex == -1) {
                                document.getElementById(id).classList.add('text-primary'); // j'ajoute la classe "text-primary" de l'élément avec l'id concerné. Comme c'est un id, je peux écraser la méthode "doLike" qui agit sur la classe pour changer la couleur des posts que le user aime déjà. 
                                this.usersLike.push(this.userId);
                                para2.nbLike++;
                                console.log(`Le user avec l'ID ${this.userId} a bien été ajouté en frontend de la liste des likers pour cet article`)
                                this.axios
                                    .put(`http://localhost:3000/api/posts/${para}`, 
                                        {
                                            usersLike: this.usersLike,
                                            nbLike: para2.nbLike,
                                        },
                                        {headers: 
                                            { 
                                                "Authorization": `Bearer ${this.token}`,
                                                "Content-Type": "application/json"
                                            }
                                        }
                                    )
                                // je récupère le message de la réponse de l'API, et je renvoie vers la page de login 
                                    .then(response => {
                                            console.log(response.data.message);
                                        }      
                                    )
                                    .catch((error) =>{
                                        console.log(error.message);
                                    })
                            }
                            else {
                                document.getElementById(id).classList.remove("text-primary"); // je retire la class "text-primary" de l'élément avec l'id concerné. 
                                // Si le user est déjà dans le tableau, Je dois le supprimer car il n'aime plus ! Je dois décrémenter également nbLike et l'enregistrer. 
                                let myIndex = this.usersLike.indexOf(this.userId); // je cherche dans le tableau l'index dont le numéro  détient bien la valeur du userID de l'utilisateur actuel.
                                //  je le supprime du tableau
                                this.usersLike.splice(myIndex, 1);
                                para2.nbLike--;
                                console.log(`Le user avec l'ID ${this.userId} a bien été retiré en frontend de la liste des likers pour cet article`);
                                this.axios
                                    .put(`http://localhost:3000/api/posts/${para}`, 
                                        {
                                            usersLike: this.usersLike,
                                            nbLike: para2.nbLike,
                                        },
                                        {headers: 
                                            { 
                                                "Authorization": `Bearer ${this.token}`,
                                                "Content-Type": "application/json"
                                            }
                                        }
                                    )
                                    // je récupère le message de la réponse de l'API, et je renvoie vers la page de login 
                                    .then(response => {
                                            console.log(response.data.message);
                                        }      
                                    )
                                    .catch((error) =>{
                                        console.log(error.message);
                                    })
                            }
                    });
        },
        // Une fonction qui me permet de comparer si le userId de l'utilisateur est dans le tableau des likers du post. Si oui, je returnn true. Ensuite j'incorpore la fonction (par la-même son résultat) dans un v-if dans la boucle d'itération de chaque post. D'où le paramètre de la fonction qui me permet de rentrer dans le scope de la boucle. 
        doLike : function (para) {
            for(let i in para){
                if(this.userId == para[i]) {
                    return true;
                }

            }
        },
    }
    }

</script>

<style scoped lang="scss">

.famousPosts {
    width: 29%;
}

.authorPicture {
    height: 35px;
    width: 35px;
    border-radius: 50%;
    object-fit: cover;
}

.postPicture{
    max-height: 300px;
    width: 100%;
    object-fit: cover;
}

.card {
    box-shadow: 1px 1px 3px rgb(220, 219, 219);
    border-radius: 5px;
    border: none;
    padding: 8px;
    
}

.categories {
    box-shadow: 1px 1px 3px rgb(220, 219, 219);
    border-radius: 5px;
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

