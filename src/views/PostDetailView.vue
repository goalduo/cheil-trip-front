<script setup>
import { routerViewLocationKey, useRoute } from 'vue-router'
import NavHeader from '../components/NavHeader.vue'
import SitemapFooter from '../components/SitemapFooter.vue'

import { detailArticle } from '@/api/BoardAPI.js'
import { Editor } from '@toast-ui/editor'

import { ref, onMounted } from 'vue'

const article = ref()
const route = useRoute()

// 게시물을 가져와서 viewer에 적용
const getArticle = async () => {
  const { articleNo } = route.params

  await detailArticle(
    articleNo,
    (response) => {
      article.value = response.data
      console.log(article.value)

      // viewer를 동적으로 생성
      const viewer = Editor.factory({
        el: document.querySelector('#viewer'),
        viewer: true,
        height: '600px',
        initialValue: article.value.content
      })
    },
    (error) => {
      console.log(error)
    }
  )
}

onMounted(() => {
  getArticle()
})
</script>

<template>
  <!-- <NavHeader></NavHeader>
  <SitemapFooter></SitemapFooter> -->
  <div id="wrap">
    <!-- props -->
    <p class="category">여행지</p>
    <!-- props -->
    <h1 class="title">{{ article?.subject }}</h1>

    <!-- props -->
    <ul class="tag">
      <li class="tag-element">#부산</li>
      <li class="tag-element">#용</li>
      <li class="tag-element">#절</li>
      <li class="tag-element">#108배</li>
    </ul>

    <!-- props -->
    <ul class="user-info">
      <li class="user-name">{{ article?.userId }}</li>
      <li class="split">|</li>
      <li class="post-date">{{ article?.registerTime }}</li>
      <li class="split">|</li>
      <li class="hit-number">조회수 {{ article?.hit }}</li>
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
