<template>
    <div class="container mt-2">
        <div class="row d-flex justify-content-between">
            <div class="bg-white wall">
                <div class="d-flex justify-content-around mt-4 mb-4">
                    <h1>Tous les articles</h1>
                    <a class="btn btn-primary" href="/createPost">Créer un article</a>
                </div>
                <!-- Je crée une boucle dans la list des posts avec la clé paramétrée sur "index" pour dire à la boucle sur quel item boucler -->
                <div v-for="(item, index) in listOfPosts"  v-bind:key="index" class="postTemplate border text-start">
                    <div class="d-flex justify-content-start">
                        <img src="../../../backend/images/unknownUser.jpg" id="userPicture" alt="user Profil"/>
                        <p class="authorPost">{{ item.authorSurname }} {{item.authorName}}</p>
                    </div>
                    <h2 class="titlePost fs-3">{{ item.title }}</h2>
                    <p class="contentPost">{{ item.content }}</p>
                    <div class="like">
                        <img src="../assets/images/heart.png" alt="" class="likeImg">
                        <span class="countLike">{{ item.like }}</span>
                    </div>
                </div>  
            </div>
            <div class="bg-white famousPosts">
                <h2 class="fs-5">Les articles les plus populaires</h2>
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
                    console.log(this.listOfPosts);
                })
                .catch((error) =>{
                    console.log(error.message);
                })
        } // Je vais appeler cette méthode en utilisant les doubles accolades dans l'élément HTML concerné. 
    },
}
</script>

<style scoped lang="scss">
.wall {
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
    height: 25px;
    width: 25px;
    border-radius: 50%;
    object-fit: cover;
}

</style>