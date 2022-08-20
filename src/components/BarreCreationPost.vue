<template>
    <div class="container d-flex my-2 p-3 bg-white">
        <img src="../assets/images/Sylvester_Stallone.jpeg" id="userPicture" alt="user Profil" class="me-2"/>
        <input class="inputPost w-100 p-2" @click="showModal = true" :placeholder=" 'Quoi de neuf' + ' '+ this.authorSurname + ' ?'">
        <vue-final-modal v-model="showModal" >
            <div class="d-flex justify-content-center align-items-center" >
                <div class="createPost w-50 bg-white h-auto rounded">
                    <h3 class="border-bottom py-3">Créer une publication</h3>
                    <form class="form mt-3 mb-5 ">
                        <div class=" d-flex text-center">
                            <input type="text" class="title mt-3 mx-auto" style="width: 75%;" v-model="title" placeholder="Titre">
                        </div>
                        <div>
                            <textarea type="text" class="content mt-3 mx-auto" style="width: 75%;" v-model="content" placeholder="Ecrivez votre article !"></textarea>
                        </div>
                        <div class="mx-auto text-start" style="width: 75%;">
                            <span class="me-3">Choisissez une catégorie : </span>
                            <select v-model="category" class="mt-3">
                                <option value="" disabled>Catégorie</option>
                                <option>Fun</option>
                                <option>Entraide</option>
                                <option>Infos</option>
                                <option>Projet</option>
                            </select>
                        </div>
                        <div class="d-flex justify-content-between mx-auto" style="width: 75%;">
                            <button type="button" class="btn btn-secondary mt-5" @click="showModal = false">Annuler</button>
                            <!-- Surtout pas de bouton de type "submit" car ca bug avec Axios ! Il faur passer le type du button en "button" !!!-->
                            <button type="button" class="btn btn-primary mt-5" @click="createPost()">Créer le post</button>
                        </div>
                    </form>
                </div>
            </div>
        </vue-final-modal>
    </div>
</template>

<script>

export default {
    name: 'BarreCreationPost',

    data () {
        return {
            authorId: JSON.parse(localStorage.getItem("userId")),
            authorSurname: JSON.parse(localStorage.getItem("userSurname")),
            authorName: JSON.parse(localStorage.getItem("userName")),
            token: JSON.parse(localStorage.getItem("token")),
            userPicture: '../assets/images/Sylvester_Stallone.jpeg',
            title: "",
            content: "",
            category: "",
            picture: "",
            like: 0, 
            showModal: false,
        }
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
    cursor : pointer;
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

</style>



