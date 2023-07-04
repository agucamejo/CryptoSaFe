import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: import ('../views/WelcomeView.vue') 
    },
    {
      path: '/login',
      name: 'login',
      component: import ('../views/LoginView.vue') 
    },
    {
      path: '/home',
      name: 'home',
      component: import ('../views/HomeView.vue') 
    },
    {
      path: '/shopping',
      name: 'shopping',
      component: import ('../views/ShoppingView.vue') 
    },
    {
      path: '/sells',
      name: 'sells',
      component: import ('../views/SellsView.vue') 
    },
    {
      path: '/movements',
      name: 'movements',
      component: import ('../views/MovementsView.vue') 
    },
    {
      path: '/balance',
      name: 'balance',
      component: import ('../views/BalanceView.vue') 
    },
    {
      path: '/learn',
      name: 'learn',
      component: import ('../views/LearnView.vue') 
    },
    {
      path: '/help',
      name: 'help',
      component: import ('../views/HelpView.vue') 
    }
  ]
})

export default router
