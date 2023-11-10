<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <header id="header">
    <div>
      <img id="logo" src="../assets/images/logo.svg" alt="logo" />
    </div>

    <div class="nav-link">
      <!-- 추후에 라우팅 경로 명시 요망 -->
      <RouterLink class="link" to="/attraction">여행지 검색</RouterLink>
      <RouterLink class="link" to="/">여행카드 만들기</RouterLink>
      <RouterLink class="link" to="/post">게시판</RouterLink>
      <RouterLink class="link" to="/post/detail">게시물 상세</RouterLink>
      <RouterLink class="link" to="/post/create">게시물 작성하기</RouterLink>
      <RouterLink class="link" to="/login">로그인</RouterLink>
    </div>
  </header>
</template>

<style scoped>
#header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  font-size: 20px;
  background-color: var(--navheader-color);
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
