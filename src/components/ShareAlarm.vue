<script setup>
import { useNotificationStore } from '@/stores/notification' 
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
const notificationStore = useNotificationStore()
const { notification } = storeToRefs(notificationStore)

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

const isOpen = ref(false)
const openAndCloseAlarm = () => {
    isOpen.value = !isOpen.value
}
</script>

<template>
    <div @click="openAndCloseAlarm" v-show="!isOpen" id="share-hide">
        <p>여행 공유 알람</p>
        <p>3</p>
    </div>

    <div @click="openAndCloseAlarm" v-show="isOpen" id="share-open">
        <p>여행 공유 알람</p>
        <ul class="alarm-list">
            <li class="alarm" v-for="item in notification" :key="item.notificationId">
                {{ item.fromId }} 님으로부터 공유된 여행이 있습니다. 
                <span>{{ elapsedTime(item.createdAt) }}</span>
            </li>
        </ul>
    </div>
</template>

<style scoped>
#share-hide {
    cursor: pointer;
    position: fixed;
    top: 100px;
    right: 30px;
    width: fit-content;
    box-sizing: border-box;
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background-color: var(--navheader-color);
    font-size: 14px;
    font-weight: 300;
    text-align: center;
    border-radius: 10px 0 10px 0;
    z-index: 10;
}

#share-hide p:last-child{
    width: 15px;
    padding: 3px;
    border-radius: 50%;
    font-weight: 600;
    background-color: var(--red-color);
}

#share-open {
    position: fixed;
    top: 100px;
    right: 30px;
    width: 350px;
    box-sizing: border-box;
    padding: 15px;
    background-color: var(--navheader-color);
    font-size: 14px;
    font-weight: 300;
    text-align: center;
    border-radius: 10px 0 10px 0;
    z-index: 10;
}

#share-open p {
    margin-bottom: 20px;
}

.alarm-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.alarm {
    cursor: pointer;
}

.alarm span {
    cursor: pointer;
    font-weight: 600;
    color: var(--tag-font-color)
}
</style>