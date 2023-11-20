<script setup>
import { RouterLink } from 'vue-router'

import { useHeaderMenuStore } from '../stores/menu'
import { storeToRefs } from 'pinia'
import { useMemberStore } from "@/stores/member";
const memberStore = useMemberStore();
const { userLogout } = memberStore;
const headerMenuStore = useHeaderMenuStore()
const { headerMenuList } = storeToRefs(headerMenuStore)
const { changeHeaderMenuState } = headerMenuStore

const logout = () => {
  window.alert('로그아웃 되었습니다.')
  sessionStorage.clear()
  changeHeaderMenuState()
}

defineProps({
  isMainPageHeader: Boolean
})
</script>

<template>
  <header id="header" :class="{ 'header-fixed': isMainPageHeader ,'header-color': isMainPageHeader }">
    <div>
      <RouterLink to="/">
        <img id="logo" src="../assets/images/logo.svg" alt="logo" />
      </RouterLink>
    </div>

    <div class="nav-link">
      <RouterLink
        @[headerMenu.event]="logout"
        v-for="headerMenu in headerMenuList"
        v-show="headerMenu.show"
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
  background-color: var(--body-color);
}

.header-fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
}

.header-color {
  background-color: var(--navheader-color) !important;
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
