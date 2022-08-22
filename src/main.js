// ****** ROLE : paramètre la configuration et le montage de l'application. Chaque module importé ici sera disponible pour tous les composants de l'application. 

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import BootstrapVue3 from 'bootstrap-vue-3'

import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faGratipay } from '@fortawesome/free-brands-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { faMessage } from '@fortawesome/free-regular-svg-icons'

/* add icons to the library */
library.add(faMagnifyingGlass)
library.add(faHeart)
library.add(faGratipay)
library.add(faMessage)

createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(BootstrapVue3)
    .use(VueAxios, axios) // on exporte pour l'ensemble des composants un middleware utilisant axios. On l'appelera dans le composant concerné avec le mot clé "this". 
    .use(router) // on exporte pour l'ensemble des composants un middleware utilisant vue-router.
    .mount('#app')

