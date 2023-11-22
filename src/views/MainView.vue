<script setup>
import NavHeader from '../components/NavHeader.vue'
import ShareAlarm from '../components/ShareAlarm.vue'
import MainContent from '../components/MainContent.vue'
import SitemapFooter from '../components/SitemapFooter.vue'
import { storeToRefs } from 'pinia'
import { useMemberStore } from '@/stores/member'
import { ref, onMounted } from 'vue'
import { useNotificationStore } from '@/stores/notification' 
const { VITE_VUE_API_URL } = import.meta.env;
const notificationStore = useNotificationStore()
const { notification } = storeToRefs(notificationStore)
const { addNotification, getNotification } = notificationStore
const memberStore = useMemberStore()
const { isLogin } = storeToRefs(memberStore)
const { userLogin, getUserInfo, userInfo } = memberStore
const mouseX = ref(0)
const mouseY = ref(0)

const mouseMove = (event) => {
  mouseX.value = event.pageX + 5
  mouseY.value = event.pageY + 5
}
onMounted(async() => {
  if (userInfo !== null) {
    await getNotification(userInfo.userId)
    const eventSource = new EventSource(VITE_VUE_API_URL + `/notification/connect/?userId=${userInfo.userId}`);
    eventSource.addEventListener("sse", function (event) {
      console.log(event.data);
    });
    eventSource.addEventListener("notification", function (event) {
      const result = JSON.parse(event.data)
      addNotification(result)
    })
  }
});


</script>

<template>
  <!-- 마우스를 따라다닐 수 있는 이미지의 이동 허용 범위 -->
  <div id="wrap" @mousemove="mouseMove">
    <div id="cursor" :style="{ left: mouseX + 'px', top: mouseY + 'px' }">
      <img id="paperplane-image" src="../assets/images/paperplane.svg" />
    </div>

    <!-- 헤더 -->
    <NavHeader :is-main-page-header="true"></NavHeader>
    <!-- 알림창 -->
    <ShareAlarm></ShareAlarm>
    <!-- 메인 컨텐츠 -->
    <MainContent></MainContent>
    <!-- 푸터 -->
    <SitemapFooter></SitemapFooter>
  </div>
</template>

<style scoped>
#wrap {
  position: relative;
  min-width: 1000px;
  width: 100%;
}

#cursor {
  position: absolute;
  z-index: 999;
}

#paperplane-image {
  width: 60px;
  transform: scaleX(-1);
}
</style>
