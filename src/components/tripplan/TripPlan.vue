<script setup>
import TripPlanElement from './TripPlanElement.vue'

const tripPlans = {
  0: { id: 1, title: '복지리가 땡기는 지리산 여행', tags: ['복지리', '복어', '지리산', '등산'] },
  1: {
    id: 2,
    title: '암벽등반은 싫지만 그래도 가는 북한산',
    tags: ['등산', '끝나고', '술', '두잔']
  },
  2: {
    id: 3,
    title: '대방어를 먹기 위한 군산 여행',
    tags: ['대방어', '기름져', '광어도', '필요해']
  },
  3: { id: 4, title: '콜라 공장 방문', tags: ['제로', '콜라', '대세'] },
  4: { id: 5, title: '복지리가 땡기는 지리산 여행', tags: ['복지리', '복어', '지리산', '등산'] }
}
</script>

<template>
  <div id="wrap">
    <div id="info">
      <div class="make-card-logo"></div>
      <div id="my-plans">
        <TripPlanElement
          v-for="tripPlan in tripPlans"
          :key="tripPlan.id"
          :tripPlan="tripPlan"
        ></TripPlanElement>
      </div>
    </div>

    <div id="make-card">
      <div id="card">
        <div class="main-logo"></div>

        <div class="user-name">
          <p class="italic-text">CARD MAKER :</p>
          <p>장수민</p>
        </div>

        <div class="trip-title">
          <p class="italic-text">TRIP TITLE :</p>
          <p>"복지리가 땡기는 지리산 여행"</p>
        </div>

        <div class="hash-tag">
          <p class="italic-text">HASH TAG :</p>
          <ul>
            <li>#복지리</li>
            <li>#복어</li>
            <li>#지리산</li>
            <li>#등산</li>
          </ul>
        </div>

        <div class="trip-course">
          <p class="italic-text">TRIP COURSE :</p>
          <ul>
            <li>남원역</li>
            <li>지리산 정상</li>
            <li>광주송정역</li>
            <li>광주 복지리탕 맛집</li>
            <li>수원역</li>
          </ul>
        </div>

        <div class="url">
          <p class="italic-text">URL :</p>
          <p>localhost:5173</p>
        </div>

        <div class="lucky-text">
          <p class="italic-text">LUCKY TEXT :</p>
          <p>일단 고민하지 말고 GO!</p>
        </div>
      </div>

      <div id="export">
        <!-- <button>이미지로 다운로드</button>
        <button>카카오톡 공유하기</button> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
#wrap {
  min-width: 1300px;
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
  color: var(--fourth-font-color);
  background-color: var(--font-color);
}

#info {
  width: 650px;
  height: 95%;
  box-sizing: border-box;
  padding: 20px;
  border: none;
  border-radius: 15px;
  box-shadow:
    0 5px 20px rgba(0, 0, 0, 0.19),
    0 3px 3px rgba(0, 0, 0, 0.21);
  /* overflow-y: scroll; */
}

.make-card-logo {
  width: 180px;
  height: 35px;
  background-image: url('@/assets/images/make-card-logo.svg');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

#my-plans {
  width: 600px;
  height: 900px;
  margin: 30px auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  align-items: center;
  justify-items: center;
}

#make-card {
  width: 600px;
  height: 95%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

#card {
  box-sizing: border-box;
  height: fit-content;
  padding: 25px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-image: url('@/assets/images/pink-color-card.svg');
  background-position: center;
  border-radius: 15px;
  box-shadow:
    0 5px 20px rgba(0, 0, 0, 0.19),
    0 3px 3px rgba(0, 0, 0, 0.21);
  font-weight: 400;
  font-size: 18px;
  letter-spacing: 0.5px;
  color: var(--font-color);
}

.main-logo {
  width: 200px;
  height: 40px;
  margin-left: -35px;
  background-image: url('@/assets/images/logo.svg');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  /* filter: blur(2px); */
}

.user-name,
.trip-title,
.hash-tag,
.trip-course,
.url,
.lucky-text {
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.italic-text {
  font-style: italic;
  font-size: 14px;
  font-weight: 100;
}

.hash-tag ul {
  display: flex;
  gap: 10px;
}

.trip-course ul {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.trip-course ul li {
  width: fit-content;
  padding: 10px;
  font-weight: 300;
  border: 1px solid var(--fourth-font-color);
  border-radius: 20px;
}

.url p:last-child {
  color: var(--fourth-font-color);
  text-decoration: underline;
}

.lucky-text p:last-child {
  font-size: 30px;
  font-weight: 400;
  color: var(--fourth-font-color);
  text-shadow:
    0 5px 20px rgba(0, 0, 0, 0.19),
    0 3px 3px rgba(0, 0, 0, 0.21);
}

#export {
  height: 200px;
  border-radius: 15px;
  box-shadow:
    0 5px 20px rgba(0, 0, 0, 0.19),
    0 3px 3px rgba(0, 0, 0, 0.21);
}
</style>
