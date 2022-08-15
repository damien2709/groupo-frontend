<template>
    <MyNav/>
    <MyCategories/>
    <MyPost/>
</template>

<script>

/* Ici on ajoute les propriétés de données, les méthodes, les cycles de vie (hooks) */
import MyNav from '@/components/MyNav.vue'
import MyPost from '@/components/AllPosts.vue' // import du composant
import MyCategories from '@/components/MyCategories.vue'

export default {
    name: 'WallArticles',
    components: {
        MyNav,
        MyCategories,
        MyPost,
    },
    //pour exécuter la méthode avant le lancement de la page, on va l'appeler dans le hook "created"
    created: function() {
        this.getTheWallPage();
    },
    methods: {
        getTheWallPage: function (){
            let isLogged = JSON.parse(localStorage.getItem("login"));
            if(!isLogged) {
                this.$router.push('/login'); //ici je crée une redirection de page (de view) avec la méthode push du router. Le paramètre est le chemin de la route. 
            }
            else {
                console.log("l'accès à la page est autorisée")
            }
        }, 
    } 
}
</script>

<style scoped lang="scss">
.navbar {
    & .logoNavbar {
        & .logo {
            max-width: 100%;
            object-fit: contain;

        }
    }
    & form {
        display: flex;
    }
    & .buttonsGroup {
        & .btn {
            display: inline-block;
            margin-right: 10px;
            width: 150px;
        }
    }
}

.titleBlock {
    margin: 30px 0;
    text-align: left;
    & .titleH2 {
        font-size: 20px;
    }
}

</style>