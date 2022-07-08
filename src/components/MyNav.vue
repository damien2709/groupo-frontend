<template>
    <div class="container-fluid MyNav">
        <nav class=" row navbar navbar-light bg-light justify-content-space-between">
            <a class="navbar-brand logoNavbar col-4 col-md-3" href="#">
                <img src="../assets/images/logo_groupo.png" class="logo d-inline-block align-top" alt="groupomania logo">
            </a>
            <form class="form-inline col-7 col-md-5">
                <input class="form-control mr-sm-2" type="search" placeholder="Rechercher des articles" aria-label="Search">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit"><font-awesome-icon icon="fa-solid fa-magnifying-glass" /></button>
            </form>
            <div class="buttonsGroup col-md-3">
                    <button type="button" class="btn btn-primary">Se déconnecter</button>
            </div>
            <div class="routerNav">
        <router-link to="/">Home</router-link> |
        <router-link to="/creation">création</router-link> |
        <router-link to="/Wall">Wall</router-link>
    </div>
        </nav>
    </div>
    
</template>

<script>

export default {
  name: 'MyNav',
}

</script>

<style>

</style>