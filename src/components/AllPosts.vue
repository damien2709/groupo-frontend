<template>
    <div class="container">
            <div class="row wallOfPosts">
                <!-- Je crée une boucle dans la list des posts avec la clé paramétrée sur "index" pour dire à la boucle sur quel item boucler -->
                <div class="card text-start mb-3" v-for="(item, index) in listOfPosts"  v-bind:key="index" >
                    <div class="d-flex card-header justify-content-between">
                        
                        <div class="d-flex align-items-center">
                            <img src="../../../backend/images/unknownUser.jpg" id="userPicture" alt="user Profil"/>
                            <p class="authorPost ms-3 mb-0">{{ item.authorSurname }} {{item.authorName}}</p>
                        </div>
                        <div v-if="item.authorId == this.userId">
                            <!-- Ici je crée un bouton dropdown menu avec Bootstrap pour modifier ou supprimer le post, uniquement si le post appartient au user.-->
                            <div class="dropdown">
                                <a href="#" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img class="menuImage" src="../assets/images/dots.png" alt="">
                                </a>
                                <div class="dropdown-menu">
                                    <a href="" class="dropdown-item" @click="modifyPost ()">Modifier l'article</a>
                                    <a href="" class="dropdown-item" @click="deletePost ()">Supprimer l'article</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-img-top"></div>
                    <div class="card-body">
                        <h2 class="titlePost card-title fs-3">{{ item.title }}</h2>
                        <p class="contentPost card-text">{{ item.content }}</p>
                    </div>
                    <div class="like card-footer d-flex align-items-center">
                        <img src="../assets/images/heart.png" alt="" class="likeImg">
                        <span class="countLike ms-2">{{ item.like }}</span>
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
            author: "",
            title: "",
            content: "",
            category: "",
            picture: "",
            like: "",
            token: JSON.parse(localStorage.getItem("token")),
            thatsMyArticle: false,
            userId: JSON.parse(localStorage.getItem("userId")),
        }
    },
    components: {

    },
        //pour exécuter la méthode avant le lancement de la page, on va l'appeler dans le hook "created"
    created: function() {
        this.getListOfPosts();
    },

    methods: {
        getListOfPosts() {
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
    },
}
</script>

<style scoped lang="scss">

.famousPosts {
    width: 29%;
}

.likeImg {
    height: 20px;
    width: auto;
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
</style>