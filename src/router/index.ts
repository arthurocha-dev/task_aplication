import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/InitialAplication.vue'
import InitialAplication from '../views/InitialAplication.vue'
import SearchUserPage from '@/views/SearchUserPage.vue'
import FormCreateUser from '@/views/FormCreateUser.vue'

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
    },

    {
      path: '/users',
      name: 'users',
      component: () => import('@/views/ListUsers.vue')
    },
    {
      path:'/userstwo',
      name: 'userstwo',
      component: () => import('@/views/ListUserTwo.vue')
    },

    {
      path: '/searchUsers',
      name: 'searchUsers',
      component: SearchUserPage 
    },
    {
      path: '/createUser',
      name: 'createuser',
      component: FormCreateUser
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginUser.vue')
    },
    {
      path: '/createList',
      name: 'createList',
      component: () => import('@/views/CreateList.vue')
    }
  ],
})

export default router
