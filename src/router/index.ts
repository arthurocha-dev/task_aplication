import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/InitialAplication.vue'
import InitialAplication from '../views/InitialAplication.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/initial',
      name: 'initial',
      component: InitialAplication,
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },

    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomePage.vue')
    }
  ],
})

export default router
