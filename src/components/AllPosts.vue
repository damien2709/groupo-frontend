<template>
    <div class="container">
        <div class="row">
            <div class="col-8">
                <postTemplate/>
                <p>{{ getListOfPosts () }}</p> <!-- Ici j'appelle la méthode 'getListOfPosts' définie plus bas.  -->
            </div>
            <div class="col-4">
                <h2>Les articles les plus populaires</h2>
            </div>
        </div>
    </div>
  
</template>

<script>
import postTemplate from '@/components/postTemplate.vue'

export default {
    name: 'MyPost',
    components: {
        postTemplate,
    },
        //pour exécuter la méthode avant le lancement de la page, on va l'appeler dans le hook "created"
    created: function() {
        this.getListOfPosts();
    },

    methods: {
        getListOfPosts() {
            console.log("la liste des posts à afficher");
        } // Je vais appeler cette méthode en utilisant les doubles accolades dans l'élément HTML concerné. 
    },
}
</script>

<style scoped lang="scss">

</style>