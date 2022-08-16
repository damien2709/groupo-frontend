<template>
<div class="container-fluid">
    <form class="form mt-5">
        <div>
            <input type="text" class="title mt-3" v-model="title" placeholder="Titre">
        </div>
        <div>
            <input type="text" class="content mt-3" v-model="content" placeholder="Contenu">
        </div>
        <div>
            <select v-model="category" class="mt-3">
                <option value="" disabled>Catégorie</option>
                <option>Fun</option>
                <option>Entraide</option>
                <option>Infos</option>
                <option>Projet</option>
            </select>
        </div>
        <!-- Surtout pas de bouton de type "submit" car ca bug avec Axios ! Il faur passer le type du button en "button" !!!-->
        <button type="button" class="btn btn-primary mt-3" @click="createPost()">Créer le post</button>
    </form>
</div>
  
</template>

<script>

export default {
    name: 'CreatePost',

    data () {
        return {
            authorId: JSON.parse(localStorage.getItem("userId")),
            authorSurname: JSON.parse(localStorage.getItem("userSurname")),
            authorName: JSON.parse(localStorage.getItem("userName")),
            token: JSON.parse(localStorage.getItem("token")),
            title: "",
            content: "",
            category: "",
            picture: "",
            like: 0, 
        }
    },
    components: {

    },

    methods: {
        createPost: function () {
        //je me connecte avec axios sur la route de login en lui passant en paramètre la route, l'objet à transmettre et l'objet d'entête http.
        this.axios
            .post('http://localhost:3000/api/posts', 
                {
                    authorId: this.authorId,
                    authorSurname: this.authorSurname,
                    authorName: this.authorName,
                    title: this.title,
                    content: this.content,
                    category: this.category,
                    like: this.like,
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
    }
}
</script>

<style scoped lang="scss">

</style>