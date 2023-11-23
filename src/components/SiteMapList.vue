<script setup>
const elements = defineProps({
  list: Array
})

const connect = (name) => {
  switch(name) {
    case '여행지 검색':
      return '/attraction'
    case '여행카드 만들기':
      return '/plan'
    case '게시판':
      return '/post'
    case '로그인':
      return '/login'
    case '회원가입':
      return '/register'
    default:
      return ''
  }
}
</script>

<template>
  <ul id="ul">
    <template v-for="element in elements.list">
      <template v-if="connect(element) !== ''">
        <RouterLink :to="connect(element)">
          {{ element }}
        </RouterLink>
      </template>
      <template v-else>
        <li>
          {{ element }}
        </li>
      </template>
    </template>
  </ul>
</template>

<style scoped>
#ul {
  width: 150px;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

li:first-child {
  font-size: 16px;
  font-weight: 700;
}

li:not(:first-child) {
  cursor: pointer;
  font-size: 14px;
  font-weight: 400;
  color: var(--sub-font-color);
}
</style>
