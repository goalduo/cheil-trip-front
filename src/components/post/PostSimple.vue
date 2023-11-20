<script setup>
import { ref, onMounted } from 'vue'
import PostCard from './PostCard.vue'
import Observer from '@/components/Observer.vue'
import { listArticle } from '@/api/BoardAPI.js'
const articles = ref([]);

onMounted(() => {
  loadMore()
})

const page = ref(0)
const loadMore = async () => {
  await listArticle(
    {pgno: page.value + 1},
    (response) => {
      response.data.forEach(element => {
        if (element.hashtags !== null) {
          element.hashtags = element.hashtags.split("-")
        }
      });
      articles.value.push(...response.data)
    },
    (error) => {
      console.log(error)
    }
  )
  page.value += 1
}
</script>

<template>
  <div id="wrap">
    <div class="card-list">
      <post-card v-for="article in articles" :key="article.id" v-bind="article" />
    </div>
    <Observer @triggerIntersected="loadMore"/>
  </div>
</template>

<style scoped>
#wrap {
  width: 100%;
  padding: 100px 0;
  background-color: var(--font-color);
}

.card-list {
  width: 80%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 20px;
  column-gap: 10px;
}
</style>
