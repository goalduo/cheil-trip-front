<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useMemberStore } from '@/stores/member'

import NavHeader from '../components/NavHeader.vue'
import SitemapFooter from '../components/SitemapFooter.vue'

import { notify } from '@/components/toastMessage.js'

const router = useRouter()
const memberStore = useMemberStore()

const { isLogin } = storeToRefs(memberStore)
const { userLogin, getUserInfo } = memberStore

const loginUser = ref({
  userId: '',
  userPass: ''
})

const login = async () => {
  await userLogin(loginUser.value)
  let token = sessionStorage.getItem('accessToken')
  if (isLogin.value) {
    notify('SUCCESS', '로그인에 성공했습니다.')
    await getUserInfo(token)
    router.push('/')
  } else {
    notify('FAIL', '로그인에 실패했습니다.')
  }
}
</script>

<template>
  <NavHeader :is-main-page-header="false"></NavHeader>
  <form id="login-form">
    <div class="login-logo"></div>
    <input type="text" id="id" v-model="loginUser.userId" placeholder="아이디" autocomplete="off"/>
    <input
      type="password"
      id="password"
      v-model="loginUser.userPass"
      @keyup.enter="login"
      placeholder="비밀번호"
      autocomplete="off"
    />
    <input type="button" id="submit" value="로그인" @click="login" />
    <div class="account">
      <!-- <RouterLink class="link" to="/">아이디 찾기</RouterLink> -->
      <!-- <RouterLink class="link" to="/">비밀번호 찾기</RouterLink> -->
      <RouterLink class="link" to="/register">회원가입</RouterLink>
    </div>
  </form>
  <SitemapFooter></SitemapFooter>
</template>

<style scoped>
#login-form {
  width: 100%;
  min-width: 1000px;
  height: 70%;
  padding: 50px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: first baseline;
  gap: 15px;
  background-color: var(--font-color);
}

.login-logo {
  width: 180px;
  height: 50px;
  background-image: url('../assets/images/login-logo.svg');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

#id,
#password {
  cursor: text;
  width: 280px;
  padding: 20px 12px;
  border: 1px solid var(--login-font-color);
  letter-spacing: -0.3px;
  font-weight: 400;
  border-radius: 4px;
  outline-color: var(--sky-color);
}

#id::placeholder,
#password::placeholder {
  opacity: 0.5;
}

#submit {
  cursor: pointer;
  width: 280px;
  padding: 20px 12px;
  letter-spacing: -0.9px;
  font-weight: 600;
  border: none;
  border-radius: 4px;
}

#submit:hover {
  background-color: var(--sky-color);
}

.account {
  display: flex;
  gap: 10px;
}

.account .link {
  cursor: pointer;
  padding: 2px 0;
  font-size: 11px;
  font-weight: 500;
  color: var(--fourth-font-color);
  text-decoration: none;
  border-bottom: 1px solid var(--tag-font-color);
}
</style>
