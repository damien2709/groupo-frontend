<!-- ************ ROLE : composant principal et structure de base de notre application VueJS. Il va appeler et afficher les autres composants. -->

<!-- Dans la balise "template" on va insérer le code HTML à afficher sur la page de notre application-->
<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/creation">création</router-link> |
    <router-link to="/Wall">Wall</router-link>
  </nav>
  <router-view/>
</template>

<!-- Dans la balise "Script", nous allons écrire toute la logique de notre composant. -->
<script>
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

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
