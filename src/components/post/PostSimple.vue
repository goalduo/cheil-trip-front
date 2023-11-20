<script setup>
import { ref } from 'vue'
import PostCard from './PostCard.vue'
import Observer from '@/components/Observer.vue'
import { listArticle } from '@/api/BoardAPI.js'
const articles = ref([]);
// onMounted(async() => {
//   await listArticle(
//     {pgno: "2"},
//     (response) => {
//       articles.value = response.data
//       console.log(articles.value)
//     },
//     (error) => {
//     console.log(error)
//   })
//     console.log(articles.value);
// })

// async function searchAttraction() {
   
// }

const page = ref(0)
const loadMore = async () => {
  await listArticle(
    {pgno: page.value + 1},
    (response) => {
      articles.value.push(...response.data)
      console.log(articles.value)
    },
    (error) => {
      console.log(error)
    }
  )
  page.value += 1
}

// const articles = [
//   {
//     id: 1,
//     userName: 'wook2',
//     title: '해동용궁사에서 용 보다',
//     content: '해동용궁사',
//     hit: 20,
//     registerTime: '2023-11-10'
//   }
// ]
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
  width: 60%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 20px;
  column-gap: 10px;
}
</style>
