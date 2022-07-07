<!-- ************ ROLE : composant principal et structure de base de notre application VueJS. Il va appeler et afficher les autres composants. -->

<!-- Dans la balise "template" on va insérer le code HTML à afficher sur la page de notre application-->
<template>
  <!--On appelle le composant .vue "AuthAppli"-->
  <AuthAppli/>
  <MyWall/>
</template>

<!-- Dans la balise "Script", nous allons écrire toute la logique de notre composant. -->
<script>
// on importe les composants que nous allons utiliser dans la balise "template" ci-dessus.
import AuthAppli from './components/auth.vue'
import MyWall from './components/wall.vue'

export default {
  name: 'App',
  components: {
    AuthAppli,
    MyWall
  }
}
</script>

<!-- La balise "style" accueille le code CSS de notre composant. Il y a une feuille de style incorporée pour chaque composant.-->
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
</style>
