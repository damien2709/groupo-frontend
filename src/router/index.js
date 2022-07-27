import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'

const routes = [
  {
    path: '/',
    name: 'homepage',
    component: HomePage
  },
  {
    path: '/creation',
    name: 'creation',
    // composant qui est lazy-loaded quand la route est sollicitée. On l'appelle par une fonction.
    component: () => import('../views/CreationCompte.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
