<script setup>
import { getTripPlanAndTripCoursesByPlanId } from "../../api/TripplanAPI";
import { onMounted, onBeforeMount } from 'vue'
const { VITE_KAKAO_KEY } = import.meta.env;
function sendLink() {
    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: '제목',
        description: '설명',
        imageUrl:
          '이미지 도메인',
        link: {
          mobileWebUrl: '모바일 링크',
          webUrl: '웹 링크',
        },
      },
      social: {
        likeCount: 286,  //좋아요 수
        commentCount: 45,  //댓글 수
        sharedCount: 845,  //공유 수
      },
      buttons: [
        {
          title: '웹으로 보기',  //첫 번째 버튼 
          link: {
            mobileWebUrl: '모바일 링크',  //버튼 클릭 시 이동 링크
            webUrl: '웹 링크',
          },
        },
        {
          title: '앱으로 보기',  //두 번째 버튼
          link: {
            mobileWebUrl: '모바일 링크',
            webUrl: '웹 링크',
          },
        },
      ],
    })
    
}

onBeforeMount(() => {
    Kakao.init(VITE_KAKAO_KEY);
    console.log(Kakao.isInitialized());
}),
onMounted(() => {
   
})
</script>

<template>
    <div>
        <button @click="sendLink">공유 링크 보내기</button>
        <button @click="sendLink">카카오 버튼</button>
    </div>
</template>

<style scoped>

</style>