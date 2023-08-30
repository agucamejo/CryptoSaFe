import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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