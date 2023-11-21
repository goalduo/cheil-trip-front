<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router'

import { storeToRefs } from 'pinia'
import { useMemberStore } from "@/stores/member";
import { notify } from '@/components/toastMessage.js'

const memberStore = useMemberStore();
const { isLogin, userInfo, isValidToken } = storeToRefs(memberStore)
import { useNotificationStore } from "@/stores/notification";
const notificationStore = useNotificationStore();
const {notification} = storeToRefs(notificationStore)
const headerMenuList = ref([])

const logout = async () => {
  isLogin.value = false;
  userInfo.value = null;
  isValidToken.value = false;
  notification.value = [];
  sessionStorage.clear();
  notify('SUCCESS', '로그아웃 되었습니다.')
  headerMenuList.value = [
      { name: '여행지 검색', routeName: '/attraction' },
      { name: '여행카드 만들기', routeName: '/plan' },
      { name: '게시판', routeName: '/post' },
      { name: '로그인', routeName: '/login' }
  ]
}

onMounted(() => {
  // 로그인 상태
  if (sessionStorage.getItem('accessToken') !== null) {
    headerMenuList.value = [
      { name: '여행지 검색', routeName: '/attraction' },
      { name: '여행카드 만들기', routeName: '/plan' },
      { name: '게시판', routeName: '/post' },
      { name: '게시물 작성하기', routeName: '/post/create' },
      { name: '마이페이지', routeName: '/my' },
      { name: '로그아웃', routeName: '/', event: 'click' }
    ]
  } else {
    console.log('hi')
    headerMenuList.value = [
      { name: '여행지 검색', routeName: '/attraction' },
      { name: '여행카드 만들기', routeName: '/plan' },
      { name: '게시판', routeName: '/post' },
      { name: '로그인', routeName: '/login' }
    ]
  }
})

defineProps({
  isMainPageHeader: Boolean
})
</script>

<template>
  <header id="header" :class="{ 'header-fixed': isMainPageHeader }">
    <div>
      <RouterLink to="/">
        <img id="logo" src="../assets/images/logo.svg" alt="logo" />
      </RouterLink>
    </div>

    <div class="nav-link">
      <RouterLink
        @[headerMenu.event]="logout"
        v-for="headerMenu in headerMenuList"
        class="link"
        :to="headerMenu.routeName"
      >
        {{ headerMenu.name }}
      </RouterLink>
    </div>
  </header>
</template>

<style scoped>
#header {
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  font-size: 20px;
  background-color: var(--navheader-color);
}

.header-fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
}

#logo {
  display: block;
  width: 300px;
  height: 60px;
  margin: 0 0 -10px -50px;
  object-fit: cover;
}

.nav-link {
  position: absolute;
  right: 30px;
  display: flex;
  gap: 35px;
}

.link {
  width: fit-content;
  font-size: 16px;
  font-weight: 400;
  text-align: center;
  text-decoration: none;
  color: var(--font-color);
}

.link:hover {
  color: var(--sky-color);
}
</style>
