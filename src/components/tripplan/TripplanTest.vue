<script setup>
import { getTripPlanAndTripCoursesByPlanId } from "../../api/TripplanAPI";
import { onMounted, onBeforeMount, ref } from 'vue'
const { VITE_KAKAO_KEY } = import.meta.env;
async function sendLink() {
    await Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: '복지리가 땡기는 지리산 여행',
        description: '#복지리 #복어 #지리산 #등산',
        imageUrl: imageUrl.value,
        link: {
          mobileWebUrl: 'localhost:5173',
          webUrl: 'localhost:5173',
        },
      },
      // social: {
      //   likeCount: 286,  //좋아요 수
      //   commentCount: 45,  //댓글 수
      //   sharedCount: 845,  //공유 수
      // },
      buttons: [
        {
          title: '웹으로 보기',  //첫 번째 버튼 
          link: {
            mobileWebUrl: 'localhost:5173',  //버튼 클릭 시 이동 링크
            webUrl: 'localhost:5173',
          },
        }
      ],
    })
}

// onBeforeMount(() => {
//     Kakao.init(VITE_KAKAO_KEY);
//     console.log(Kakao.isInitialized());
// }),
onMounted(() => {
  Kakao.init(VITE_KAKAO_KEY);
  console.log(Kakao.isInitialized());
})

// const uploadedImageUrl = ref('')
// const upload = (files) => {
//   Kakao.Share.uploadImage({file: files}).then((response) => {
//     console.log(response.infos.original.url)
//   }).catch((error) => {
//     console.log(error)
//   });
// }

// const handleFileChange = async (event) => {
//   const file = event.target.files[0]
//   if (file) {
//     try {
//       const imageUrl = await upload(file)
//       console.log('Image uploaded: ', imageUrl)

//       uploadedImageUrl.value = imageUrl
//     } catch (error) {
//       console.log('Image upload failed!')
//     }
//   }
// }

// const upload = async () => {
//   await Kakao.Share.uploadImage(fileInput).then((response) => {
//     console.log(response.infos.original.url)
//   }).catch((error) => {
//     console.log(error)
//   });
// }
const imageUrl = ref('')

// Kakao API를 사용하여 이미지 업로드
const imageUploader = ref()
const uploadImageFile = (files) => {
  Kakao.Share.uploadImage({
    file: files
  }).then((response) => {
    console.log(response.infos.original.url)
    imageUrl.value = response.infos.original.url
    console.log(imageUrl.value)
  }).catch((error) => {
    console.log(error)
  });
                                                                                                                                                   
  imageUploader.value.value = ''
}
</script>

<template>
    <div>
        <input type="file" ref="imageUploader" @change="uploadImageFile($event.target.files)">
        <button @click="sendLink">공유 링크 보내기</button>
    </div>
</template>

<style scoped>

</style>