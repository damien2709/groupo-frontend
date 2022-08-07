<template>
    <MyNav/>
    <div class="container rounded bg-white mt-5">
        <div class="row">
            <div class="col-md-4">
                <div class="d-flex flex-column align-items-center text-center py-5"><img class="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"><span class="font-weight-bold">Utilisateur</span>
                </div>
                <div class="text-center">
                    <button class="btn btn-info profile-button" type="button">Changer la photo</button>
                </div>
            </div>
            <div class="col-md-8 border-right">
                <div class="p-3 py-5">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h1 class="text-right">Profil utilisateur</h1>
                    </div>
                    <div class="row mt-2">
                        <div class="col-md-6" >
                            <input type="text" class="form-control" placeholder="Prénom" >
                        </div>
                        <div class="col-md-6">
                            <input type="text" class="form-control"  placeholder="Nom">
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-md-12 mb-3">
                            <input type="text" class="form-control" placeholder="Nom d'utilisateur" >
                        </div>
                        <div class="col-md-12 mb-3">
                            <input type="password" class="form-control" placeholder="Mot de passe" >
                        </div>
                        <div class="col-md-12 mb-3">
                            <input type="email" class="form-control" placeholder="Email" >
                        </div>
                        <div class="col-md-12 mb-3">
                            <input type="text" class="form-control" placeholder="Service" >
                        </div>
                        <div class="col-md-12 mb-3">
                            <input type="tel" class="form-control" placeholder="Tel du service" >
                        </div>
                        
                    </div>
                    
                    <div class="mt-5 text-center d-flex justify-content-between">
                        <button class="btn btn-primary profile-button" type="button">Sauvegarder le profil</button>
                        <button class="btn btn-danger profile-button" type="button">Supprimer le profil</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

  
</template>

<script>
/* Ici on ajoute les propriétés de données, les méthodes, les cycles de vie (hooks) */
import MyNav from '@/components/MyNav.vue'

export default {
    name: 'ProfilPage',

    components: {
        MyNav
    },

}
</script>


<style scoped lang="scss">

.form-control:focus {
    box-shadow: none;
    border-color: #BA68C8
}

.profile-button {
    &:hover {
        background: #682773
    }
    &:focus {
        background: #682773;
        box-shadow: none
    }
    &:active {
        background: #682773;
        box-shadow: none
    }
}

</style>