<!-- La view qui affiche l'ensemble de la page et ses composants -->
<template>
    <div class="container-fluid sticky-top">
        <div class="row ">
            <BarreNav/>
        </div>
    </div>
    <div class="container">
        <div class="row col-lg-8 mx-auto">
            <BarrePresentation/>
            <BarreCreationPost/>
        </div>
        <div class="row">
            <div class="col-lg-8 mx-auto">
                <AllPosts :key="componentKey"/>

            </div>

        </div>
    </div>

</template>

<script>

import BarreNav from '@/components/BarreNav.vue'
import BarrePresentation from '@/components/BarrePresentation.vue'
import BarreCreationPost from '@/components/BarreCreationPost.vue'
import AllPosts from '@/components/AllPosts.vue' 

export default {
    name: 'WallArticles',
    components: {
        BarreNav,
        BarrePresentation,
        BarreCreationPost,
        AllPosts,
 
    },
    mounted: function() {
        this.getTheWallPage();
    },
    methods: {
        // Une fonction pour vérifier l'autorisation d'accès à la page, le user doit être loggé 
        getTheWallPage: function (){
            let isLogged = JSON.parse(localStorage.getItem("login"));
            if(isLogged == false) {
                this.$router.push('/login'); 
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