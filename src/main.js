// ****** ROLE : paramètre la configuration et le montage de l'application. Chaque module importé ici sera disponible pour tous les composants de l'application. 

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { vfmPlugin } from 'vue-final-modal'
import "bootstrap/dist/css/bootstrap.min.css"

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faMagnifyingGlass)

createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(VueAxios, axios) // on exporte pour l'ensemble des composants un middleware utilisant axios. On l'appelera dans le composant concerné avec le mot clé "this". 
    .use(router) // on exporte pour l'ensemble des composants un middleware utilisant vue-router.
    .use(vfmPlugin) // on exporte le module pour les popups pour l'ensemble du projet
    .mount('#app')

