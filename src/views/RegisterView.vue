<script setup>
import NavHeader from '../components/NavHeader.vue'
import SitemapFooter from '../components/SitemapFooter.vue'
</script>

<template>
  <NavHeader></NavHeader>
  <form id="register-form">
    <div class="register-logo"></div>

    <h1 id="register-title">나의 온라인 지도, 제일여행</h1>

    <div class="group">
      <label for="name">이름</label>
      <input type="text" id="name" name="name" placeholder="이름" />
    </div>
    <div class="group">
      <label for="id">아이디</label>
      <input type="text" id="id" name="id" placeholder="아이디" />
    </div>
    <div class="group">
      <label for="email">이메일</label>
      <input type="email" id="email" name="email" placeholder="이메일" />
    </div>
    <div class="group">
      <label for="password">비밀번호</label>
      <input type="password" id="password" name="password" placeholder="******" />
    </div>
    <div class="group">
      <label for="password-confirm">비밀번호 확인하기</label>
      <input type="password" id="password-confirm" name="password-confirm" placeholder="******" />
    </div>
    <input type="button" id="submit" value="가입하기" />
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
