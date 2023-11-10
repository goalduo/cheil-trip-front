import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/MainView.vue'
import PostView from '@/views/PostView.vue'
import AttractionSearchView from '@/views/AttractionSearchView.vue'
import PostCreateView from '@/views/PostCreateView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainView
    },
    {
      path: '/post',
      name: 'post',
      component: PostView
    },
    {
      path: '/post/create',
      name: 'postCreate',
      component: PostCreateView
    },
    {
      path: '/attraction',
      name: 'attraction',
      component : AttractionSearchView
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
