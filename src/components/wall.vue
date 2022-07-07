<template>
  <div class="container-fluid">
    <div class="row">
         <nav class=" col navbar navbar-light bg-light justify-content-between">
            <a class="navbar-brand logoNavbar" href="#">
                <img src="../assets/images/logo_groupo.png" class="logo d-inline-block align-top" alt="groupomania logo">
            </a>
            <form class="form-inline ">
                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>

        </nav>
    </div>
  </div>
</template>

<script>
export default {
    name: 'MyWall',
    props: {

  }
}
</script>

<style scoped lang="scss">
.navbar {
    & .logoNavbar {
        & .logo {
            max-width: 200px;
        }
    }
    & form {
        display: flex;
    }
}

</style>