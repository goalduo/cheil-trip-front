<script setup>
import { useRouter } from 'vue-router';

defineProps({
  tripPlan: Object
})

const router = useRouter()

const goToTripCourseDetailView = (planId) => {
  router.push({ name: 'attractionsaved', params: { id: planId }})
}
</script>

<template>
  <div id="plan">
    <div class="info">
      <img
        src="https://t1.kakaocdn.net/kakaocorp/kakaocorp/admin/category/1cf6a77b018800001.png?type=thumb&amp;opt=C72x72.fwebp"
        width="36"
        height="36"
      />
      <div class="state">여행 경로</div>
      <div class="detail" @click.stop="goToTripCourseDetailView(tripPlan.planId)">상세보기 ></div>
    </div>

    <h1 id="title">{{ tripPlan.planName }}</h1>

    <ul id="tag">
      <li v-for="tag in tripPlan.hashtags">#{{ tag }}</li>
    </ul>
  </div>
</template>

<style scoped>

#plan {
  cursor: pointer;
  box-sizing: border-box;
  flex-shrink: 0;
  width: 300px;
  height: 200px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 15px;
  background-color: var(--font-color);
  box-shadow: 4px 12px 30px 6px var(--shadow-color);
  transition: transform .2s ease, padding .2s ease;
}

#plan:hover {
  transform: translate(0, -10px);
  box-shadow: 4px 12px 30px 16px var(--shadow-color);
}

.info {
  display: flex;
  align-items: center;
  gap: 10px;
}
.state, .detail {
  padding: 5px 10px;
  font-size: 13px;
  line-height: 20px;
  color: var(--tag-font-color);
  border-radius: 10px;
  background-color: var(--tag-color);
}

.detail {
  cursor: pointer;
}

.date {
  font-size: 11px;
  line-height: 20px;
  color: var(--tag-font-color);
}

#title {
  margin: 10px 0;
  font-weight: 500;
  font-size: 20px;
  word-break: keep-all;
  color: var(--fourth-font-color);
}

#tag {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  gap: 5px;
  font-size: 14px;
  font-weight: 200;
  line-height: 19px;
  color: var(--tag-font-color);
}
</style>
