<!-- La barre de recherche par catégories et mots clés + le mur des posts -->
<template>
<!-- Bannière de recherche par catégorie ou mots clés-->
    <div class="container px-0">
        <div class="row categories p-2 mb-2 d-flex" style="background: #4E5166;">
            <div class="px-0 text-start">
                <button class="btn btn-primary me-2 mb-2" @click="setCatPost('Infos')">Infos</button>
                <button class="btn btn-primary me-2 mb-2" @click="setCatPost('Projet')">Projets</button>
                <button class="btn btn-primary me-2 mb-2" @click="setCatPost('Entraide')">Entraide</button>
                <button class="btn btn-primary me-2 mb-2" @click="setCatPost('Fun')">Fun</button>
                <button class="btn btn-primary me-2 mb-2" @click="setCatPostAll()">Toutes</button>
                <button class=" btn me-2 mb-2" style="background-color:#FFD7D7 " @click="setUserPosts()">Mes posts</button> 
                <form class="input-group d-flex me-3" role="search" v-on:submit.prevent>
                    <input class="form-control" type="search" placeholder="Recherche par mots clés !" aria-label="Search" v-model="searchWords" @keyup.enter="setSearch()">
                    <button class="btn btn-outline-primary" type="button" @click="setSearch()"><font-awesome-icon icon="fa-solid fa-magnifying-glass" /></button>
            </form>
            </div>
        </div>
         <p v-if="noPost == true" class="mt-2">Il n'y a pas d'article pour le moment !</p> 
        <div class="row wallOfPosts">

<!-- Affichage des posts -->
    <!-- CARD POST -->
            <div class="card cardPost text-start mb-3"  v-for="(item, idx) in listOfPosts"  v-bind:key="idx">
        <!-- CARD HEADER NOM USER + MENU POST - DROPDOWN-->
                    <div class="card-header d-flex justify-content-between">
                        <div class="d-flex align-items-center">
                            <p>{{ searchAuthor(item.user_id) }}</p>
                            <img :src="this.authorPicture" class="authorPicture" alt="USER"/>
                            <p class="authorPost ms-3 mb-0">  {{ authorSurname }} {{authorName}}</p>
                        </div>
                        <div v-if="item.user_id == this.userId || isAdmin == true">
                            <div class="dropdown">
                                <a href="#" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img class="menuImage" src="../assets/images/dots.png" alt="">
                                </a>
                                <div class="dropdown-menu">
                                    <a href="" class="dropdown-item" data-bs-toggle="modal" :data-bs-target="'#modPost'+item.id">Modifier l'article</a>
                                    <a href="" class="dropdown-item" data-bs-toggle="modal" :data-bs-target="'#suppPost'+item.id">Supprimer l'article</a>
                                </div>
                            </div>
                        </div>
                        <!-- Modal Modification article -->
                        <div class="modal fade" :id="'modPost'+item.id" tabindex="-1" aria-labelledby="modificationPost" aria-hidden="true">
                            <div class="modal-dialog" >
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title">Modifier la publication</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
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
                                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="modifyPost(item.id, 'titlePost'+item.id, 'contentPost'+item.id, 'categoryPost'+item.id, item.user_id)">Modifier le post</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Modal suppression article. -->
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
                                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="deletePost(item.id, item.user_id)">Supprimer</button>
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
            likerSurname: '',
            likerName:'',
            isAdmin: false,
            url: '',
            searchWords: '',
            noPost: false,
        }
    },
    components: {

    },

    mounted: function() {
        this.getListOfPosts();
        this.getProfil();
        this.getListOfUsers();
    },

    methods: {
        // recherche par catégorie
        setCatPost: function (para){
            this.url = `http://localhost:3000/api/posts?category=${para}`;
            this.getListOfPosts();
        },
        // recherche par mots clés
        setSearch: function() {
            this.url = `http://localhost:3000/api/posts?content=${this.searchWords}`;
            this.getListOfPosts();
        },  
        // recherche par auteur
        setUserPosts: function() {
            this.url = `http://localhost:3000/api/posts?userId=${this.userId}`;
            this.getListOfPosts();
        },
        // recherche de tous les posts
        setCatPostAll: function (){
            this.url = `http://localhost:3000/api/posts`;
            this.getListOfPosts();
        },  
        // récupération du fichier utilisateur  
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
                    this.isAdmin = response.data.data.isAdmin;
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

                .then(response => {
                    this.listOfUsers = response.data.data;
                })
                .catch((error) =>{
                    console.log(error.message);
                })
        },
        // pour afficher les noms et prénoms des auteurs de post
        searchAuthor: function (para) {
                    this.author = this.listOfUsers.filter(user => user.id == para);
                    this.authorPicture = this.author[0].picture;
                    this.authorName = this.author[0].name;
                    this.authorSurname = this.author[0].surname;
        },
        // Pour afficher le nom des likers
        searchLiker: function (para) {
            this.liker = this.listOfUsers.filter(user => user.id == para);
            this.likerName = this.liker[0].name;
            this.likerSurname = this.liker[0].surname;
        },
        // Fonction pour récupérer et afficher la liste des posts
        getListOfPosts: function () {
            if(this.url == `http://localhost:3000/api/posts?content=${this.searchWords}`) {
            this.axios
                .get(this.url, 
                    {headers: 
                        { "Authorization": `Bearer ${this.token}`}
                    }
                )

                .then(response => {
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
            else if(this.url == 'http://localhost:3000/api/posts?category=Infos') {
            this.axios
                .get(this.url, 
                    {headers: 
                        { "Authorization": `Bearer ${this.token}`}
                    }
                )

                .then(response => {
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
            else if(this.url == 'http://localhost:3000/api/posts?category=Projet') {
            this.axios
                .get(this.url, 
                    {headers: 
                        { "Authorization": `Bearer ${this.token}`}
                    }
                )

                .then(response => {
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
            else if(this.url == 'http://localhost:3000/api/posts?category=Entraide') {
            this.axios
                .get(this.url, 
                    {headers: 
                        { "Authorization": `Bearer ${this.token}`}
                    }
                )

                .then(response => {
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
            else if(this.url == 'http://localhost:3000/api/posts?category=Fun') {
            this.axios
                .get(this.url, 
                    {headers: 
                        { "Authorization": `Bearer ${this.token}`}
                    }
                )

                .then(response => {
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
            else if(this.url == `http://localhost:3000/api/posts?userId=${this.userId}`) {
            this.axios
                .get(this.url, 
                    {headers: 
                        { "Authorization": `Bearer ${this.token}`}
                    }
                )

                .then(response => {
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
            else {
                this.axios
                    .get('http://localhost:3000/api/posts', 
                        {headers: 
                            { "Authorization": `Bearer ${this.token}`}
                        }
                    )
                    .then(response => {
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
        // Fonction de modification d'un post 
        modifyPost: function (para, title, content, category, user_id) {
            if(user_id == this.userId || this.isAdmin == true) {
                this.axios
                    .put(`http://localhost:3000/api/posts/${para}`, 
                        {
                            title: document.getElementById(`${title}`).value, 
                            content: document.getElementById(`${content}`).value,
                            category: document.getElementById(`${category}`).value,
                            picture: this.postPicture,
                            user_id: this.userId,
                            isAdmin: this.isAdmin,
                        },
                        {headers: 
                            { 
                                "Authorization": `Bearer ${this.token}`,
                                "Content-Type": 'multipart/form-data'
                            }
                        }
                    )

                    .then(response => {
                        console.log(response.data);
                        this.getListOfPosts();
                    })
                    .catch((error) =>{
                        console.log(error.message);
                    })
            }
            else {
                console.log("Vous n'êtes pas autorisé à modifier cet article !");
            }
        },
        // Fonction de suppression d'un post. 
        deletePost: function (para, user_id) {
            if(user_id == this.userId || this.isAdmin == true) {
                this.axios
                    .delete(`http://localhost:3000/api/posts/${para}`,
                        {
                            data: {user_id: this.userId},
                            headers: { "Authorization": `Bearer ${this.token}`}

                        }
                    )
                    .then(response => {
                        console.log(response.data.message);
                        this.getListOfPosts(); 
                    })
                    .catch(error => {
                        console.log(error.message);
                    })
            }
            else {
                console.log("Vous n'êtes pas autorisé à modifier cet article !");
            }
        },
        // Fonction d'ajout ou de suppression du user du tableau des likers de post. 
        addLike: function (para, id, para2) {
            this.axios
                .get(`http://localhost:3000/api/posts/${para}`, 
                    {headers: 
                        { "Authorization": `Bearer ${this.token}`}
                    }
                )
                    .then( (response) => {
                        this.usersLike = response.data.data.usersLike; 
                        let myIndex = this.usersLike.indexOf(this.userId); 
                        // S'il' n'existe pas, ça renvoie -1, et donc je vais ajouter l'utilisateur dans la liste des likers et je vais incrémenter nbLike puis enregistrer le tout dans la BDD. 
                            if (myIndex == -1) {
                                document.getElementById(id).classList.add('text-primary'); 
                                this.usersLike.push(this.userId);
                                console.log(this.usersLike);
                                para2.nbLike++;
                                console.log(`Le user avec l'ID ${this.userId} a bien été ajouté en frontend de la liste des likers pour cet article`)
                                this.axios
                                    .put(`http://localhost:3000/api/posts/${para}`, 
                                        {
                                            user_id: this.userId,
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

                                    .then(response => {
                                            console.log(response.data.message);
                                        }      
                                    )
                                    .catch((error) =>{
                                        console.log(error.message);
                                    })
                            }
                            else {
                                document.getElementById(id).classList.remove("text-primary"); 
                                // Si le user est déjà dans le tableau, Je dois le supprimer car il n'aime plus ! Je dois décrémenter également nbLike et l'enregistrer. 
                                let myIndex = this.usersLike.indexOf(this.userId); 
                                this.usersLike.splice(myIndex, 1);
                                para2.nbLike--;
                                console.log(`Le user avec l'ID ${this.userId} a bien été retiré en frontend de la liste des likers pour cet article`);
                                this.axios
                                    .put(`http://localhost:3000/api/posts/${para}`, 
                                        {
                                            user_id: this.userId,
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
                                    .then(response => {
                                            console.log(response.data.message);
                                        }      
                                    )
                                    .catch((error) =>{
                                        console.log(error.message);
                                    })
                            }
                    })
                    .catch((error) =>{
                        console.log(error.message);
                    })
        },
        // Une fonction qui permet d'afficher si le user like le post
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

