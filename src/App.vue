<!-- ************ ROLE : composant principal et structure de base de notre application VueJS. Il va appeler et afficher les autres composants. -->


<template>
  <router-view />
</template>

<script>

export default {
  name: 'App',

}
</script>


<style lang="scss">
#app {

  font-family: 'Lato', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
