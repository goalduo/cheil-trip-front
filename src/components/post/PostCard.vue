<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'

const props = defineProps({
  articleNo: Number,
  userId: String,
  subject: String,
  content: String,
  category: String,
  hashtags: Array,
  hit: Number,
  registerTime: String,
})

function elapsedTime(date) {
  const start = new Date(date)
  const end = new Date()

  const diff = (end - start) / 1000

  const times = [
    { name: '년', milliSeconds: 60 * 60 * 24 * 365 },
    { name: '개월', milliSeconds: 60 * 60 * 24 * 30 },
    { name: '일', milliSeconds: 60 * 60 * 24 },
    { name: '시간', milliSeconds: 60 * 60 },
    { name: '분', milliSeconds: 60 }
  ]

  for (const value of times) {
    const betweenTime = Math.floor(diff / value.milliSeconds)

    if (betweenTime > 0) {
      return `${betweenTime}${value.name} 전`
    }
  }
  return '방금 전'
}

const randomColor = ref([false, false, false])
const pickRandomNumber = () => {
  return Math.floor(Math.random(0, 1) * 3)
}
randomColor.value[pickRandomNumber()] = true

const router = useRouter()
const goDetailView = () => {
  router.push({ name: 'postDetail', params: { articleNo: props.articleNo}})
}
</script>

<template>
  <section @click="goDetailView" id="section">
    <div class="upper">
      <div class="info">
        <img
          src="https://t1.kakaocdn.net/kakaocorp/kakaocorp/admin/6562f7bc017800001.png?type=thumb&opt=C72x72.fwebp"
          width="36"
          height="36"
        />
        <div class="state">{{ props.category }}</div>
        <span class="date">{{ elapsedTime(props.registerTime) }}</span>
      </div>

      <h1 id="title">{{ props.subject }}</h1>

      <ul id="tag">
        <li v-for="tag in props.hashtags" :key="tag">#{{ tag }}</li>
      </ul>
    </div>

    <!-- <div class="lower"> 내용 : {{ content }} , <br/> 작성자 : {{ userName }} , 조회수 : {{ hit }}</div> -->
    <div class="lower" :class="{ 'purple-color': randomColor[0], 'green-color': randomColor[1], 'sky-color': randomColor[2] }">
      <div class="writer">
        <p>작성자 :</p> 
        <p>{{ props.userId }}</p>
      </div>

      <div class="hit">
        <p>조회수 :</p> 
        <p>{{ props.hit }}</p>
      </div>
    </div>
    <!-- <img src="" alt=""> -->
  </section>
</template>

<style scoped>
#section {
  cursor: pointer;
  box-sizing: border-box;
  width: 400px;
  height: fit-content;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  background-color: var(--font-color);
  box-shadow: 4px 12px 30px 6px var(--shadow-color);
  transition: transform .2s ease, padding .2s ease;
}

#section:hover {
  transform: translate(0, -10px);
  box-shadow: 4px 12px 30px 16px var(--shadow-color);
}

.upper {
  box-sizing: border-box;
  /* height: 170px; */
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.info {
  display: flex;
  align-items: center;
  gap: 10px;
}
.state {
  padding: 5px 10px;
  font-size: 13px;
  line-height: 20px;
  color: var(--tag-font-color);
  border-radius: 10px;
  background-color: var(--tag-color);
}
.date {
  font-size: 11px;
  line-height: 20px;
  color: var(--tag-font-color);
}

#title {
  margin: 10px 0;
  font-size: 25px;
  color: var(--fourth-font-color);
}

#tag {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  gap: 5px;
  font-size: 14px;
  line-height: 19px;
  color: var(--tag-font-color);
}

.writer, .hit {
  color: var(--font-color)
}
.writer p:first-child, .hit p:first-child {
  font-size: 15px;
  font-weight: 200;
}

.writer p:last-child, .hit p:last-child {
  font-size: 20px;
  font-weight: 600;
}

.lower {
  box-sizing: border-box;
  height: 130px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 0 0 15px 15px;
}

.purple-color {
  background-color: var(--purple-color);
}

.green-color {
  background-color: var(--green-color);
}

.sky-color {
  background-color: var(--sky-color);
}
</style>
