import { createRouter, createWebHistory } from 'vue-router'
import WallArticles from '@/views/WallArticles.vue' // j'importe le fichier .view. @ permet de se placer directement dans le fichier "src"
import MyLogin from '@/views/MyLogin.vue'
import CreationCompte from '@/views/CreationCompte.vue'
import ProfilPage from '@/views/ProfilPage.vue'
import NotFound from '@/views/NotFound.vue'

/* Ici, les routes de notre application Vue sont définies via un tableau contenant des objets qui définissent chaque route. Chaque objet route contient trois propriétés clés :
	• path (chemin) - l'URL correspondant au composant ;
	• name (nom) - le nom de cette route pour l'étiquetage et le débuggage ;
	• component (composant) - le composant qui doit s'afficher lorsque le path est trouvé.
*/
//je définis également un objet 'meta' pour chaque route comprenant un titre et une description pour les moteurs de recherche
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
    name: 'creation',
    path: '/creation',
    component: CreationCompte,
    meta: {
      title: "Création compte Groupomania",
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
  // On va créer une route pour gérer les 404 : 
  {
    name : 'Page non trouvée',
    path: '/:pathMatch(.*)', // c'est une regex pour rediriger toutes les routes non trouvées,
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

// Grace à la méthode 'afterEach()' de router, je déclare les titres et descriptions des pages web de l'appli en les associant aux métas déclarées dans les routes.
router.afterEach((to) => {
  document.title = to.meta.title;
})

// J'exporte le router pour qu'il soit disponible dans l'application
export default router;

