<script setup>
import { routerViewLocationKey } from 'vue-router'
import NavHeader from '../components/NavHeader.vue'
import SitemapFooter from '../components/SitemapFooter.vue'

import { Editor } from '@toast-ui/editor'

import { onMounted } from 'vue'

onMounted(() => {
  const viewer = Editor.factory({
    el: document.querySelector('#viewer'),
    viewer: true,
    height: '600px',
    initialValue: `# Hello
    안녕하세요 저는 MINWOOK입니다
    제가 저번 주에 부산에 있는 해동용궁사를 다녀왔는데요
    글쎼, 용이 있는거 아니겠어요
    수고하세요!
    `
  })
})
</script>

<template>
  <!-- <NavHeader></NavHeader>
  <SitemapFooter></SitemapFooter> -->
  <div id="wrap">
    <!-- props -->
    <p class="category">여행지</p>

    <!-- props -->
    <h1 class="title">해동 용궁사에서 용보다</h1>

    <!-- props -->
    <ul class="tag">
      <li class="tag-element">#부산</li>
      <li class="tag-element">#용</li>
      <li class="tag-element">#절</li>
      <li class="tag-element">#108배</li>
    </ul>

    <!-- props -->
    <ul class="user-info">
      <li class="user-name">민욱</li>
      <li class="split">|</li>
      <li class="post-date">23.11.10 11:11</li>
      <li class="split">|</li>
      <li class="hit-number">조회수 11</li>
    </ul>

    <div id="viewer"></div>
  </div>
</template>

<style scoped>
#wrap {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 25px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: var(--fourth-font-color);
  background-color: var(--font-color);
}

.category {
  width: fit-content;
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--tag-font-color);
  background-color: var(--sky-color);
  border: none;
  border-radius: 30px;
}

.title {
  margin: 5px 0 10px 0;
  font-size: 30px;
  font-weight: 600;
}

.tag {
  display: flex;
  gap: 10px;
  font-size: 15px;
  font-style: italic;
  color: var(--tag-font-color);
}

.user-info {
  margin: 10px 0;
  display: flex;
  gap: 10px;
  font-size: 15px;
  color: var(--tag-font-color);
}

.split {
  color: var(--tag-color);
}

#viewer {
  width: 1000px;
}
</style>
