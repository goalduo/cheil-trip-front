<script setup>
// 추후에 처리해야 할 내용은 아래 모든 input 요소의 value에 대해 유효성 검사를 마쳤을 때, 가입할 수 있어야 함.

import NavHeader from '../components/NavHeader.vue'
import SitemapFooter from '../components/SitemapFooter.vue'
import { userRegist } from '@/api/UserAPI.js'
import { ref, watch } from 'vue'
import router from "../router";

const name = ref('')
const id = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const isValidEmail = ref(false)
const isValidPassword = ref(false)
const isValidConfirmPassword = ref(false)

const emailRegExp = /^[a-zA-z0-9._%+-]+@[a-zA-Z0-9._]+\.[a-zA-Z]{2,}$/
const passwordRegExp = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/

watch(email, () => {
  if (email.value && emailRegExp.test(email.value)) {
    isValidEmail.value = true
  } else {
    isValidEmail.value = false
  }
})

watch(password, () => {
  if (password.value && passwordRegExp.test(password.value)) {
    isValidPassword.value = true
  } else {
    isValidPassword.value = false
  }
})

watch(confirmPassword, () => {
  isValidConfirmPassword.value = confirmPassword.value === password.value ? true : false
})

// IME(한글) 처리를 위한 메서드 선언
const onChangeNameInputValue = (event) => {
  name.value = event.target.value
}
const onChangeIdInputValue = (event) => {
  id.value = event.target.value
}

async function registerUserInfo() {
  const userInfo = {
    userId : id.value,
    userName : name.value,
    userPass : password.value,
    userEmail : email.value
  }
  await userRegist(
    userInfo,
    (response) => {
      router.push('/')
      console.log(response)
    }),
    (error) => {
        console.error(error);
    }
}

</script>

<template>
  <NavHeader></NavHeader>
  <form id="register-form">
    <div class="register-logo"></div>

    <h1 id="register-title">나의 온라인 지도, 제일여행</h1>

    <div class="group">
      <label for="name">이름</label>
      <input
        :value="name"
        @input="onChangeNameInputValue"
        type="text"
        id="name"
        name="name"
        placeholder="이름"
      />
    </div>
    <div class="group">
      <label for="id">아이디</label>
      <input
        :value="id"
        @input="onChangeIdInputValue"
        type="text"
        id="id"
        name="id"
        placeholder="아이디"
      />
      <!-- <p class="input-text-error">중복된 아이디가 있습니다.</p> -->
    </div>
    <div class="group">
      <label for="email">이메일</label>
      <input
        v-model="email"
        :class="{ 'input-error': !isValidEmail }"
        type="email"
        id="email"
        name="email"
        placeholder="이메일"
      />
      <p v-show="!isValidEmail" class="input-text-error">이메일 주소를 정확히 입력해주세요.</p>
    </div>
    <div class="group">
      <label for="password">비밀번호</label>
      <input
        v-model="password"
        :class="{ 'input-error': !isValidPassword }"
        type="password"
        id="password"
        name="password"
        placeholder="********"
      />
      <p v-show="!isValidPassword" class="input-text-error">
        영문, 숫자, 특수문자를 조합하여 입력해주세요. (8-16자)
      </p>
    </div>
    <div class="group">
      <label for="password-confirm">비밀번호 확인하기</label>
      <input
        v-model="confirmPassword"
        :class="{ 'input-error': !isValidConfirmPassword }"
        type="password"
        id="password-confirm"
        name="password-confirm"
        placeholder="********"
      />
      <p v-show="!isValidConfirmPassword" class="input-text-error">비밀번호가 일치하지 않습니다.</p>
    </div>
    <input type="button" id="submit" value="가입하기" @click="registerUserInfo" />
  </form>
  <SitemapFooter></SitemapFooter>
</template>

<style scoped>
label {
  display: block;
  font-size: 12px;
  color: var(--tag-font-color);
}

#register-form {
  width: 100%;
  height: 80%;
  margin: 70px auto 0 auto;
  padding: 50px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: first baseline;
  gap: 15px;
  background-color: var(--font-color);
  border: 1px solid var(--third-font-color);
}

.register-logo {
  width: 180px;
  height: 50px;
  background-image: url('../assets/images/register-logo.svg');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

#register-title {
  font-weight: 200;
  color: var(--tag-font-color);
}

.group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

#name,
#id,
#email,
#password,
#password-confirm {
  cursor: text;
  width: 280px;
  padding: 20px 12px;
  border: 1px solid var(--login-font-color);
  letter-spacing: -0.3px;
  font-weight: 400;
  border-radius: 4px;
  outline-color: var(--sky-color);
}

/* input 테두리에 오류를 알리기 위한 클래스 선택자 */
.input-error {
  outline-color: var(--red-color) !important;
}

/* 텍스트로 오류를 알리기 위한 클래스 선택자 */
.input-text-error {
  line-height: 16px;
  font-size: 11px;
  color: var(--red-color);
}

#name::placeholder,
#id::placeholder,
#email::placeholder,
#password::placeholder,
#password-confirm::placeholder {
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

.account p {
  cursor: pointer;
  padding: 2px 0;
  font-size: 11px;
  font-weight: 400;
  color: var(--fourth-font-color);
  border-bottom: 1px solid var(--tag-font-color);
}
</style>
