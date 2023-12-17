//Configura las rutas con Vue Router 
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({ //Crea el enrutador.
  history: createWebHistory(import.meta.env.BASE_URL), //Usa la URL base definida para crear un historial de navegación. 
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: () => import ('../views/WelcomeView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import ('../views/LoginView.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import ('../views/HomeView.vue')
    },
    {
      path: '/purchase',
      name: 'purchase',
      component:  () => import ('../views/PurchaseView.vue')
    },
    {
      path: '/sales',
      name: 'sales',
      component: () => import ('../views/SalesView.vue')
    },
    {
      path: '/movements',
      name: 'movements',
      component: () => import ('../views/MovementsView.vue')
    },
    {
      path: '/balance',
      name: 'balance',
      component: () => import ('../views/BalanceView.vue')
    },
    {
      path: '/learn',
      name: 'learn',
      component: () => import ('../views/LearnView.vue')
    },
  ]
})

export default router

//Los componentes se cargan de manera diferida (lazy-loaded) usando funciones lambda (() => import(...)) para mejorar el rendimiento, cargando los componentes solo cuando se necesitan.