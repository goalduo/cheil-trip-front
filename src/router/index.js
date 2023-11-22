import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/MainView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import PostView from '@/views/PostView.vue'
import AttractionSearchView from '@/views/AttractionSearchView.vue'
import PostCreateView from '@/views/PostCreateView.vue'
import PostDetailView from '@/views/PostDetailView.vue'
import PostModifyView from '@/views/PostModifyView.vue'
import TripPlanView from '@/views/TripPlanView.vue'
import MyPageView from '@/views/MyPageView.vue'
import KakaoMap from '@/components/attraction/KakaoMap.vue'
import TripplanTest from '@/components/tripplan/TripplanTest.vue'
import attractionshare from '@/components/attraction/attractionshare.vue'
import attractionSaved from '@/components/attraction/attractionSaved.vue'

import { storeToRefs } from 'pinia'
import { useMemberStore } from "@/stores/member"
import { notify } from '@/components/toastMessage.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainView,
      beforeEnter: (to, from) => {
        const memberStore = useMemberStore();
        const { userInfo } = storeToRefs(memberStore)
        console.log(userInfo)
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      beforeEnter: (to, from) => {
        const memberStore = useMemberStore();
        const { userInfo } = storeToRefs(memberStore)
        if (userInfo.value) {
          notify('FAIL', '이미 로그인이 되어 있습니다.')
          return { name: 'main' }
        }
      }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      beforeEnter: (to, from) => {
        const memberStore = useMemberStore();
        const { userInfo } = storeToRefs(memberStore)
        if (userInfo.value === null) {
          notify('FAIL', '이미 로그인이 되어 있습니다.')
          return { name: 'main' }
        }
      }
    },
    {
      path: '/post',
      name: 'post',
      component: PostView
    },
    {
      path: '/post/create',
      name: 'postCreate',
      component: PostCreateView,
      beforeEnter: (to, from) => {
        const memberStore = useMemberStore();
        const { userInfo } = storeToRefs(memberStore)
        if (userInfo.value === null) {
          notify('FAIL', '로그인이 필요한 서비스입니다.')
          return { name: 'main' }
        }
      }
    },
    {
      path: '/attraction',
      name: 'attraction',
      component: AttractionSearchView,
      props :true
    },
    {
      path: '/attraction/saved/:id',
      name: 'attractionsaved',
      component : attractionSaved,
      beforeEnter: (to, from) => {
        const memberStore = useMemberStore();
        const { userInfo } = storeToRefs(memberStore)
        if (userInfo.value === null) {
          notify('FAIL', '로그인이 필요한 서비스입니다.')
          return { name: 'main' }
        }
      }
    },
    {
      path: '/attraction/:id',
      name: 'attractionshare',
      component : attractionshare,
      beforeEnter: (to, from) => {
        const memberStore = useMemberStore();
        const { userInfo } = storeToRefs(memberStore)
        if (userInfo.value === null) {
          notify('FAIL', '로그인이 필요한 서비스입니다.')
          return { name: 'main' }
        }
      }
    },
    // {
    //   path: '/post/detail',
    //   name: 'postDetail',
    //   component: PostDetailView
    // },
    {
      path: '/post/detail/:articleNo',
      name: 'postDetail',
      component: PostDetailView,
      beforeEnter: (to, from) => {
        const memberStore = useMemberStore();
        const { userInfo } = storeToRefs(memberStore)
        if (userInfo.value === null) {
          notify('FAIL', '로그인이 필요한 서비스입니다.')
          return { name: 'main' }
        }
      }
    },
    {
      path: '/post/modify/:articleNo',
      name: 'postModify',
      component: PostModifyView,
      beforeEnter: (to, from) => {
        const memberStore = useMemberStore();
        const { userInfo } = storeToRefs(memberStore)
        if (userInfo.value === null) {
          notify('FAIL', '로그인이 필요한 서비스입니다.')
          return { name: 'main' }
        }
      }
    },
    {
      path: '/plan',
      name: 'plan',
      component: TripPlanView,
      beforeEnter: (to, from) => {
        const memberStore = useMemberStore();
        const { userInfo } = storeToRefs(memberStore)
        if (userInfo.value === null) {
          notify('FAIL', '로그인이 필요한 서비스입니다.')
          return { name: 'main' }
        }
      }
    },
    {
      path: '/my',
      name: 'my',
      component: MyPageView,
      beforeEnter: (to, from) => {
        const memberStore = useMemberStore();
        const { userInfo } = storeToRefs(memberStore)
        if (userInfo.value === null) {
          notify('FAIL', '로그인이 필요한 서비스입니다.')
          return { name: 'main' }
        }
      }
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
