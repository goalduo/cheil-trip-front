<script setup>
import { ref, onMounted, computed } from 'vue'
import PostCard from './PostCard.vue'
import Observer from '@/components/Observer.vue'
import { listArticle } from '@/api/BoardAPI.js'
const articles = ref([]);

onMounted(() => {
  loadMore()
})

const zeroIndexArticles = computed(() => {
  return articles.value.filter((article, index) => {
    return index % 3 == 0
  })
})

const oneIndexArticles = computed(() => {
  return articles.value.filter((article, index) => {
    return index % 3 == 1
  })
})

const twoIndexArticles = computed(() => {
  return articles.value.filter((article, index) => {
    return index % 3 == 2
  })
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
      // console.log(articles.value)
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
    <!-- <div class="card-list">
      <post-card v-for="article in articles" :key="article.id" v-bind="article" />
    </div> -->
    <div class="card-list">
      <div class="card-list-column">
        <post-card v-for="article in zeroIndexArticles" :key="article.id" v-bind="article" />
      </div>
      <div class="card-list-column">
        <post-card v-for="article in oneIndexArticles" :key="article.id" v-bind="article" />
      </div>
      <div class="card-list-column">
        <post-card v-for="article in twoIndexArticles" :key="article.id" v-bind="article" />
      </div>
    </div>
    <Observer @triggerIntersected="loadMore"/>
  </div>
</template>

<style scoped>
#wrap {
  box-sizing: border-box;
  width: 100%;
  min-width: 1000px;
  min-height: 100%;
  padding: 100px 0;
  background-color: var(--font-color);
}

/* .card-list {
  width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  row-gap: 50px;
  column-gap: 10px;
} */

.card-list {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  gap: 50px;
}

.card-list-column {
  display: flex;
  flex-direction: column;
  gap: 50px;
}
</style>
