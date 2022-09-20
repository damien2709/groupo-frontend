// Configuration de V-router et des routes de l'application 

import { createRouter, createWebHistory } from 'vue-router'
import WallArticles from '@/views/WallArticles.vue' 
import MyLogin from '@/views/MyLogin.vue'
import ProfilPage from '@/views/ProfilPage.vue'
import NotFound from '@/views/NotFound.vue'

// définition des routes de l'application
const routes = [
  {
    name: 'accueil',
    path: '/',
    component: WallArticles,
    meta: {
      title: "Accueil",
    }
  },
  {
    name: 'login',
    path: '/login',
    component: MyLogin,
    meta: {
      title: "Connexion Groupomania",
    }
  },
  {
    name: 'profil',
    path: '/profil',
    component: ProfilPage,
    meta: {
      title: "Profil",
    }
  },
    //route pour gérer les 404 : 
  {
    name : 'Page non trouvée',
    path: '/:pathMatch(.*)', 
    component: NotFound,
    meta: {
      title: "404 Page non trouvée !",
    }

  }
]

// Je déclare mon router 
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// déclare les titres des pages web de l'appli 
router.afterEach((to) => {
  document.title = to.meta.title;
})


export default router;

