<script setup>
import { routerViewLocationKey, useRoute } from 'vue-router'
import NavHeader from '../components/NavHeader.vue'
import SitemapFooter from '../components/SitemapFooter.vue'

import { detailArticle, deleteArticle } from '@/api/BoardAPI.js'
import { Editor } from '@toast-ui/editor'

import { notify } from '@/components/toastMessage.js'
import { ref, onMounted } from 'vue'
import { useMemberStore } from '@/stores/member'
import router from "../router"
const memberStore = useMemberStore()
const { userInfo } = memberStore
const article = ref()
const route = useRoute()

onMounted(async () => {
  const { articleNo } = route.params
  const response = await detailArticle(articleNo)
  console.log(response)
  if(response.hashtags !== null) response.hashtags = response.hashtags.split("-")
  article.value = response
  // viewer를 동적으로 생성
  const viewer = Editor.factory({
        el: document.querySelector('#viewer'),
        viewer: true,
        height: '600px',
        initialValue: article.value.content
      })
  
})

function deleteArticleByArticleId() {
  // const result = confirm("삭제하시겠습니까?");
  // if (!result) return;
  deleteArticle(article.value.articleNo, ((response) => {
    // console.log(response)
    notify('SUCCESS', '게시물이 삭제되었습니다.')
    router.push("/post")
  }))
}

function goToModifyView() {
  router.push({ name: 'postModify', params: { articleNo: article.value.articleNo}})
}
</script>

<template>
  <NavHeader :is-main-page-header="false"></NavHeader>
  <div id="wrap">
    <!-- props -->
    <p class="category">{{ article?.category }}</p>
    <!-- props -->
    <h1 class="title">{{ article?.subject }}</h1>

    <!-- props -->
    <ul class="tag">
      <li v-for="tag in article?.hashtags" :key="tag">#{{ tag }}</li>
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
    <div class="button-group">
      <button v-if="article?.userId === userInfo?.userId" @click="goToModifyView" class="modify">수정</button>
      <button v-if="article?.userId === userInfo?.userId" @click="deleteArticleByArticleId" class="delete">삭제</button>
    </div>
  </div>
  <SitemapFooter></SitemapFooter>
</template>

<style scoped>
#wrap {
  box-sizing: border-box;
  min-width: 1000px;
  width: 100%;
  min-height: 100%;
  padding: 50px 20px;
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
  width: 700px;
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

.button-group {
  margin: 20px 0;
  display: flex;
  gap: 10px;
}

.modify {
  cursor: pointer;
  width: 80px;
  height: 50px;
  font-size: 16px;
  background-color: var(--font-color);
  border: 1px solid var(--tag-color);
  border-radius: 4px;
}

.delete {
  cursor: pointer;
  width: 80px;
  height: 50px;
  font-size: 16px;
  border: 1px solid var(--tag-color);
  border-radius: 4px;
}

.modify:hover, .delete:hover {
  border-color: var(--fourth-font-color);
}
</style>
