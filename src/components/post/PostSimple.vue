<script setup>
import PostCard from "./PostCard.vue";

const articles = [
  {
    id: 1,
    userName: 'wook2',
    title: 'Card title',
    content: 'Card content',
    hit: 20,
    registerTime: '2023-11-10'
  },
  {
    id: 2,
    userName: 'wook2',
    title: 'Card title',
    content: 'Card content',
    hit: 20,
    registerTime: '2023-02-05'
  },
  {
    id: 3,
    userName: 'wook2',
    title: 'Card title',
    content: 'Card content',
    hit: 20,
    registerTime: '2023-02-05'
  },
  {
    id: 4,
    userName: 'wook2',
    title: 'Card title',
    content: 'Card content',
    hit: 20,
    registerTime: '2023-02-05'
  },
  {
    id: 5,
    userName: 'wook2',
    title: 'Card title',
    content: 'Card content',
    hit: 20,
    registerTime: '2023-02-05'
  },
  {
    id: 6,
    userName: 'wook2',
    title: 'Card title',
    content: 'Card content',
    hit: 20,
    registerTime: '2023-02-05'
  }
]
</script>

<template>
  <div class="container">
    <div class="row g-4">
        <post-card v-for="article in articles" :key="article.id" :class="{'col col-lg-1' : true}" v-bind="article"/>
    </div>
  </div>
</template>

<style scoped>

</style>
