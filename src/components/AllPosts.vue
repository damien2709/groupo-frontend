<template>
    <div class="container mt-2">
        <div class="row d-flex justify-content-between">
            <div class="wallOfPosts p-0">
                <PostBanniere/>
                <!-- Je crée une boucle dans la list des posts avec la clé paramétrée sur "index" pour dire à la boucle sur quel item boucler -->
                <div class="card text-start mb-3" v-for="(item, index) in listOfPosts"  v-bind:key="index" >
                    <div class="d-flex card-header justify-content-between">
                        
                        <div class="d-flex align-items-center">
                            <img src="../../../backend/images/unknownUser.jpg" id="userPicture" alt="user Profil"/>
                            <p class="authorPost ms-3 mb-0">{{ item.authorSurname }} {{item.authorName}}</p>
                        </div>
                        <div>
                            <!-- Ici je crée un bouton dropdown menu avec Bootstrap pour modifier ou supprimer le post, uniquement si le post appartient au user. Je remplace le texte du bouton par une image en utilisant "template" et l'attribut "no-caret"-->
                            <b-dropdown  size="sm" class="dropdownMenu m-md-2" variant="link" toggle-class="text-decoration-none" no-caret v-if="item.authorId == this.userId">
                                <template #button-content>
                                    <img class="menuImage" src="../assets/images/dots.png" alt="">
                                </template>
                                <b-dropdown-item  href="#" @click="modifyPost ()">Modifier l'article</b-dropdown-item>
                                <b-dropdown-item href="#" @click="deletePost ()">Supprimer l'article</b-dropdown-item>
                            </b-dropdown>
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
            <div class="bg-white famousPosts">
                <h2 class="fs-5 mt-3">Les articles les plus populaires</h2>
            </div>
        </div>
    </div>
  
</template>

<script>
import PostBanniere from '@/components/PostBanniere.vue'

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
        PostBanniere,
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
.wallOfPosts {
    width: 70%;
}

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