<template>
    <div class="container-fluid sticky-top">
        <div class="row ">
            <BarreNav/>
        </div>
    </div>
    <div class="container">
        <div class="row">
            <BarrePresentation/>
            <BarreCreationPost/>
        </div>
        <div class="row">
            <div class="col-lg-8">
                <AllPosts :key="componentKey"/>

            </div>
            <div class="col-lg-4">
                <UsefulInfos/>
            </div>
            
        </div>
    </div>

</template>

<script>

/* Ici on ajoute les propriétés de données, les méthodes, les cycles de vie (hooks) */
import BarreNav from '@/components/BarreNav.vue'
import BarrePresentation from '@/components/BarrePresentation.vue'
import BarreCreationPost from '@/components/BarreCreationPost.vue'
import AllPosts from '@/components/AllPosts.vue' // import du composant
import UsefulInfos from '@/components/UsefulInfos.vue' // import du composant

export default {
    name: 'WallArticles',
    components: {
        BarreNav,
        BarrePresentation,
        BarreCreationPost,
        AllPosts,
        UsefulInfos,
 
    },
    //pour exécuter la méthode après le montage de la page, on va l'appeler dans le hook "mounted"
    mounted: function() {
        this.getTheWallPage();
    },
    methods: {
        // Une fonction pour vérifier l'autorisation d'accès à la page, le user doit être loggé 
        getTheWallPage: function (){
            let isLogged = JSON.parse(localStorage.getItem("login"));
            if(isLogged == false) {
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