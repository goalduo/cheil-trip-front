<script setup>
import { ref, onMounted } from 'vue';

const snowUnits = ref([])
const snowSequence = ref(1)

const addSnow = () => {
  snowUnits.value.push(snowSequence.value++)
}

const generateSnow = (size) => {
  for (let i = 0; i < size; i++) {
    addSnow()
  }
}

const beforeEnter = (element) => {
  const offset = 400
  const min = -offset
  const max = window.screen.width + offset
  const left = generateRandomInteger(min, max)
  element.style.left = left + 'px'

  const scale = generateRandom(0.25, 1)
  element.style.transfrom = `scale(${scale})`

  const opacity = generateRandom(0.1, 1)
  element.style.opacity = opacity

  const delay = generateRandom(1, 10000)
  const duration = generateRandom(10000, 30000)
  element.style.animationDelay = delay + 'ms'
  element.style.animationDuration = duration + 'ms'
}

const generateRandom = (begin, end) => {
  const max = Math.max(begin, end)
  const min = Math.min(begin, end)
  const range = max - min
  return Math.random() * range + min
}

const generateRandomInteger = (begin, end) => {
  return parseInt(generateRandom(begin, end))
}

onMounted(() => {
  generateSnow(500)
})
</script>

<template>
  <section id="logo-section">
    <TransitionGroup @before-enter="beforeEnter">
      <div v-for="(snow, index) in snowUnits" class="snow falling" :key="index"></div>
    </TransitionGroup>

    <img id="hanok-image" src="../assets/images/hanok.svg" />
    <img id="tree-image" src="../assets/images/tree.svg" />
    <img id="tower-image" src="../assets/images/tower.svg" />
    <img id="sub-hanok-image" src="../assets/images/sub-hanok.svg" />
    <img id="building-image" src="../assets/images/building.svg" />
    <img id="mountain-image" src="../assets/images/mountain.svg" />

    <div id="sub-logo"></div>
  </section>

  <section id="intro-section">
    <span>설레는 여행의 시작, 제일여행과 함께 해요!</span>
    <span>제일여행의 서비스는 아래에서 확인할 수 있습니다.</span>
  </section>

  <section id="description-section">
    <div class="trip-plan-image">
      <p>여행 경로를 저장할 수 있어요!</p>
    </div>
    <div class="trip-share-image">
      <p>여행을 같이 짤 수도 있어요!</p>
    </div>
    <div class="trip-post-image">
      <p>게시글을 올릴 수도 있죠!</p>
    </div>
    <div class="trip-card-image">
      <p>여행 카드를 공유할 수도 있어요!</p>
    </div>
  </section>
</template>

<style scoped>
#logo-section {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  display: flex;
  overflow: hidden;
}

.snow {
  position: absolute;
  top: -10px;
  width: 6px;
  height: 6px;
  background-color: var(--font-color);
  border-radius: 50%;
  z-index: 30;
  transform: scale(0.5);
  opacity: 0.5;
}

.snow.falling {
  animation: falling;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-duration: 10s;
}

@keyframes falling {
  from {
    top: 0%;
  }
  to {
    top: 99%;
    opacity: 0;
  }
}

#intro-section {
  position: relative;
  top: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
  letter-spacing: 1px;
  color: var(--sky-color);
}

#description-section {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70vh;
  margin-bottom: 100px;
  padding: 60px 120px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-row-gap: 60px;
  grid-column-gap: 20px;
  letter-spacing: 1px;
  color: var(--sky-color);
}

#description-section div {
  box-sizing: border-box;
  width: 320px;
  margin: 0 auto;
  padding: 10px;
  background-color: var(--navheader-color);
  border-radius: 15px;
}

#description-section div:nth-child(1) {
  grid-row: 1 / span 2;
  grid-column: 1;
}

#description-section div:nth-child(4) {
  grid-row: 1 / span 2;
  grid-column: 3;
}

.trip-plan-image {
  position: relative;
  box-sizing: border-box;
  background-image: url('../assets/images/trip-plan.png');
  background-size: 120%;
  background-position: -10px -10px;
  background-repeat: no-repeat;
}

.trip-plan-image p, .trip-share-image p, .trip-post-image p, .trip-card-image p {
  position: absolute;
  left: 0;
  top: -30px;
  box-sizing: border-box;
  width: fit-content;
  word-break: keep-all;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 1px;
  color: var(--sky-color);
}

.trip-share-image {
  position: relative;
  box-sizing: border-box;
  background-image: url('../assets/images/trip-share.png');
  background-position: -10px -10px;
  background-size: 115%;
  background-repeat: no-repeat;
}

.trip-post-image {
  position: relative;
  box-sizing: border-box;
  background-image: url('../assets/images/trip-post.png');
  background-position: -8px -18px;
  background-size: 105%;
  background-repeat: no-repeat;
}

.trip-card-image {
  position: relative;
  box-sizing: border-box;
  background-image: url('../assets/images/trip-card.png');
  background-position: -8px -10px;
  background-size: 105%;
  background-repeat: no-repeat;
}

span:nth-child(1) {
  font-size: 50px;
  font-weight: 800;
}

span:nth-child(2) {
  font-size: 30px;
  font-weight: 800;
}

#hanok-image {
  position: absolute;
  bottom: 0;
  left: 430px;
  width: 400px;
  margin-bottom: -35px;
  z-index: 10;
}

#tree-image {
  position: absolute;
  bottom: 0;
  left: 600px;
  width: 500px;
  margin-bottom: -30px;
  z-index: 20;
}

#tower-image {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 700px;
  margin: 0 0 -20px -260px;
  z-index: 20;
}

#sub-hanok-image {
  position: absolute;
  bottom: 0;
  left: 300px;
  width: 400px;
  margin: 0 0 -70px -200px;
}

#building-image {
  position: absolute;
  bottom: 0;
  left: 900px;
  width: 550px;
  margin-bottom: -85px;
  z-index: 10;
}

#mountain-image {
  position: absolute;
  bottom: 0;
  left: 1350px;
  width: 600px;
  margin-bottom: -60px;
}

#sub-logo {
  width: 55%;
  height: 50vh;
  margin: 0 auto;
  align-self: center;
  background-image: url('../assets/images/sub-logo.svg');
  background-position: center;
  opacity: 0.8;
  z-index: 40;
}
</style>
