import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/creation',
    name: 'creation',
    // composant qui est lazy-loaded quand la route est sollicitée. On l'appelle par une fonction.
    component: () => import('../views/CreationCompte.vue')
  },
  {
    path: '/wall',
    name: 'wall',
    // composant qui est lazy-loaded quand la route est sollicitée. On l'appelle par une fonction.
    component: () => import('../views/WallArticles.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
