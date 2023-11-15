<script setup>
import {ref, onMounted} from 'vue'
import PostCard from './PostCard.vue'
import { listArticle } from '@/api/BoardAPI.js'
const articles = ref([]);
onMounted(async() => {
  await listArticle(
    {},
    (response) => {
      articles.value = response.data
      console.log(articles.value)
    },
    (error) => {
    console.log(error)
  })
    console.log(articles.value);
})

async function searchAttraction() {
   
}

// const articles = [
//   {
//     id: 1,
//     userName: 'wook2',
//     title: '해동용궁사에서 용 보다',
//     content: '해동용궁사',
//     hit: 20,
//     registerTime: '2023-11-10'
//   },
//   {
//     id: 2,
//     userName: 'wook2',
//     title: '서울 롯데타워에서 다이빙',
//     content: '서울 롯데타워',
//     hit: 20,
//     registerTime: '2023-02-05'
//   },
//   {
//     id: 3,
//     userName: 'wook2',
//     title: 'Card title',
//     content: 'Card content',
//     hit: 20,
//     registerTime: '2023-02-05'
//   },
//   {
//     id: 4,
//     userName: 'wook2',
//     title: 'Card title',
//     content: 'Card content',
//     hit: 20,
//     registerTime: '2023-02-05'
//   },
//   {
//     id: 5,
//     userName: 'wook2',
//     title: 'Card title',
//     content: 'Card content',
//     hit: 20,
//     registerTime: '2023-02-05'
//   },
//   {
//     id: 6,
//     userName: 'wook2',
//     title: 'Card title',
//     content: 'Card content',
//     hit: 20,
//     registerTime: '2023-02-05'
//   }
// ]
</script>

<template>
  <div id="container">
    <div class="card-list">
      <post-card v-for="article in articles" :key="article.id" v-bind="article" />
    </div>
  </div>
</template>

<style scoped>
#container {
  width: 1000px;
  margin: 100px auto;
}

.card-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 20px;
  column-gap: 10px;
}
</style>
