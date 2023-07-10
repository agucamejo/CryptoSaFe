import { createRouter, createWebHistory } from 'vue-router'
import { defineAsyncComponent } from 'vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: defineAsyncComponent({ loader: () => import ('../views/WelcomeView.vue')})
    },
    {
      path: '/login',
      name: 'login',
      component: defineAsyncComponent({ loader: () => import ('../views/LoginView.vue')})
    },
    {
      path: '/home',
      name: 'home',
      component: defineAsyncComponent({ loader: () => import ('../views/HomeView.vue')})
    },
    {
      path: '/shopping',
      name: 'shopping',
      component: defineAsyncComponent({ loader: () => import ('../views/ShoppingView.vue')})
    },
    {
      path: '/sells',
      name: 'sells',
      component: defineAsyncComponent({ loader: () => import ('../views/SellsView.vue')})
    },
    {
      path: '/movements',
      name: 'movements',
      component: defineAsyncComponent({ loader: () => import ('../views/MovementsView.vue')})
    },
    {
      path: '/balance',
      name: 'balance',
      component: defineAsyncComponent({ loader: () => import ('../views/BalanceView.vue')})
    },
    {
      path: '/learn',
      name: 'learn',
      component: defineAsyncComponent({ loader: () => import ('../views/LearnView.vue')})
    },
    {
      path: '/help',
      name: 'help',
      component: () => import ('../views/HelpView.vue')
    }
  ]
})

export default router
