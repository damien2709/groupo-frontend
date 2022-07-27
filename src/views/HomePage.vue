<!-- On implémente le HTML-->
<template>
    <MyLogin/>
    <WallArticles/>
</template>

<!-- On écrit la logique du composant puis on l'exporte -->
<script>
import MyLogin from '@/components/MyLogin.vue'
import WallArticles from '@/components/WallArticles.vue'

let login= JSON.parse(localStorage.getItem("login"));
console.log(login);

export default {
    name: 'HomePage',
    components: {
        MyLogin,
        WallArticles
    },



}


</script>

<!-- On gère le style du HTML du composant. On ajoute l'attribut "scoped" pour limiter le code CSS au composant -->
<style scoped lang="scss">


</style>
