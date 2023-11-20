<script setup>
defineProps({
  tripPlan: Object
})
</script>

<template>
  <div id="plan">
    <div class="info">
      <img
        src="https://t1.kakaocdn.net/kakaocorp/kakaocorp/admin/category/1cf6a77b018800001.png?type=thumb&amp;opt=C72x72.fwebp"
        width="36"
        height="36"
      />
      <div class="state">여행 경로 저장</div>
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
  width: 300px;
  height: 200px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 15px;
  background-color: var(--font-color);
  box-shadow: 4px 12px 30px 6px var(--shadow-color);
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
