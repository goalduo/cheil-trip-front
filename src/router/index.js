import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/MainView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import PostView from '@/views/PostView.vue'
import AttractionSearchView from '@/views/AttractionSearchView.vue'
import PostCreateView from '@/views/PostCreateView.vue'
import PostDetailView from '@/views/PostDetailView.vue'
import TripPlanView from '@/views/TripPlanView.vue'
import KakaoMap from '@/components/attraction/KakaoMap.vue'
import TripplanTest from '@/components/tripplan/TripplanTest.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
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
      component: AttractionSearchView
    },
    {
      path: '/post/detail',
      name: 'postDetail',
      component: PostDetailView
    },
    {
      path: '/plan',
      name: 'plan',
      component: TripPlanView
    },
    {
      path: '/maptest',
      name: 'maptest',
      component: KakaoMap
    },
    {
      path: '/urltest',
      name: 'urltest',
      component: TripplanTest
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
