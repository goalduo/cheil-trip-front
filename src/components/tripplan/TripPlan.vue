<script setup>
import TripPlanElement from './TripPlanElement.vue'
import html2canvas from 'html2canvas'
import { ref, onMounted } from 'vue'
import { getTripplansAndTripCoursesByUserId } from '@/api/TripplanAPI.js'
import { useMemberStore } from "@/stores/member";
import { storeToRefs } from 'pinia'
const memberStore = useMemberStore();

const { VITE_KAKAO_KEY } = import.meta.env;
const { userInfo } = storeToRefs(memberStore)
const tripPlans = ref([]);

const captureTarget = ref()
const currentTargetTripPlan = ref({})
// 클립보드에 복사하는 방법
// const captureImage = async () => {
//   await html2canvas(captureTarget.value).then((canvas) => {
//     canvas.toBlob((blob) => navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]))
//   })
// }

// 이미지로 저장하는 방법
const captureImage = async () => {
  const canvas = await html2canvas(captureTarget.value, {
    scale: 4
  })
  const image = canvas.toDataURL('image/jpeg')
  const link = document.createElement('a')
  link.href = image
  link.download = 'trip_course.jpeg'
  link.click()
}

// 카카오톡으로 공유하는 방법
const imageUrl = ref('')
const imageUploader = ref()
const uploadImageFile = async (files) => {
  await Kakao.Share.uploadImage({
    file: files
  }).then((response) => {
    console.log(response.infos.original.url)
    imageUrl.value = response.infos.original.url
  }).catch((error) => {
    console.log(error)
  })
  imageUploader.value.value = ''                                                                                                                                               
}

// file-input에서 파일 선택 클릭 시 업로드
// change 이벤트가 일어나면 먼저 카카오에 이미지를 업로드
// 업로드 후 imageUrl 반응성 객체가 변경
// 변경된 바를 토대로 공유하기
async function sendLink(files) {
    await uploadImageFile(files)

    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: currentTargetTripPlan?.value.planName,
        description: '#' + currentTargetTripPlan?.value.hashtags.join(' #'),
        imageUrl: imageUrl.value,
        link: {
          mobileWebUrl: 'localhost:5173',
          webUrl: 'localhost:5173',
        },
      },
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

const randomColor = ref([false, false, false, false, false])

const pickRandomNumber = () => {
  return Math.floor(Math.random(0, 1) * 5)
}

const changeCurrentTargetTripPlan = (tripPlan) => {
  currentTargetTripPlan.value = tripPlan 
  randomColor.value.fill(false)
  randomColor.value[pickRandomNumber()] = true
}

onMounted(async () => {
  if (!Kakao.isInitialized()) {
    Kakao.init(VITE_KAKAO_KEY);
  }

  const result = await getTripplansAndTripCoursesByUserId(userInfo.value.userId);
  result.forEach(tripPlan => {
    tripPlan.hashtags = tripPlan.hashtags?.split('-')
    tripPlans.value.push(tripPlan)
  })
  if (result.length >= 1) currentTargetTripPlan.value = tripPlans.value[0]
  randomColor.value[pickRandomNumber()] = true
})
</script>

<template>
  <div id="wrap">
    <div id="info">
      <div class="make-card-logo"></div>
      <div id="my-plans">
        <TripPlanElement
        v-for="tripPlan in tripPlans"
        :key="tripPlan.planId"
        :tripPlan="tripPlan"
        @click="changeCurrentTargetTripPlan(tripPlan)"
        ></TripPlanElement>
      </div>
    </div>

    <div id="make-card">
      <div ref="captureTarget" id="card" :class="{ 'purple-color-card': randomColor[0], 'orange-color-card': randomColor[1], 'green-color-card': randomColor[2], 'sky-color-card': randomColor[3], 'pink-color-card': randomColor[4] }">
        <div class="main-logo"></div>
        <div class="right-up-edge"></div>
        <div class="right-down-edge"></div>

        <div class="user-name">
          <p class="italic-text">CARD MAKER :</p>
          <p>{{ userInfo?.userId }}</p>
        </div>

        <div class="trip-title">
          <p class="italic-text">TRIP TITLE :</p>
          <p>"{{ currentTargetTripPlan?.planName }}"</p>
        </div>

        <div class="hash-tag">
          <p class="italic-text">HASH TAG :</p>
          <ul>
            <li v-for="tag in currentTargetTripPlan?.hashtags">#{{ tag }}</li>
          </ul>
        </div>

        <div class="trip-course">
          <p class="italic-text">TRIP COURSE :</p>
          <ul>
            <li v-for="tripCourse, index in currentTargetTripPlan?.tripCourseList">
              {{ tripCourse.place_name }}
              <span>{{ index + 1 }}</span>
            </li>
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
        <button @click="captureImage" id="download-button">
          <div class="download-logo"></div>
          이미지로 다운로드
        </button>
        <label for="file">
          <div id="share-button">
            <div class="share-logo"></div>
            카카오톡 공유하기
          </div>
        </label>
        <input id="file" type="file" name="file" ref="imageUploader" @change="sendLink($event.target.files)" />
      </div>
    </div>
  </div>
</template>

<style scoped>
#wrap {
  min-width: 1300px;
  width: 100%;
  min-height: 100vh;
  padding: 50px 20px;
  display: flex;
  gap: 20px;
  color: var(--fourth-font-color);
  background-color: var(--font-color);
}

#info {
  width: 700px;
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
  width: 650px;
  height: 900px;
  margin: 30px auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  align-items: center;
  justify-items: center;
}

#make-card {
  position: relative;
  width: 500px;
  height: 95%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

#card {
  position: relative;
  box-sizing: border-box;
  height: fit-content;
  padding: 25px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-position: center;
  box-shadow:
    0 5px 20px rgba(0, 0, 0, 0.19),
    0 3px 3px rgba(0, 0, 0, 0.21);
  font-weight: 400;
  font-size: 18px;
  letter-spacing: 0.5px;
  color: var(--font-color);
}

.purple-color-card {
  background-image: url('@/assets/images/purple-color-card.svg');
}

.orange-color-card {
  background-image: url('@/assets/images/orange-color-card.svg');
}

.green-color-card {
  background-image: url('@/assets/images/green-color-card.svg');
}

.sky-color-card {
  background-image: url('@/assets/images/sky-color-card.svg');
}

.pink-color-card {
  background-image: url('@/assets/images/pink-color-card.svg');
}

.main-logo {
  width: 200px;
  height: 45px;
  margin-left: -35px;
  background-image: url('@/assets/images/small-logo.svg');
  background-position: center;
  background-repeat: no-repeat;
}

.right-up-edge {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-top: 2px solid var(--font-color);
  border-right: 2px solid var(--font-color);
}
.right-down-edge {
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-bottom: 2px solid var(--font-color);
  border-right: 2px solid var(--font-color);
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
  border: 1px solid var(--font-color);
  border-radius: 20px;
}

.trip-course ul li span {
  margin-left: 10px;
  font-weight: 100;
  color: var(--font-color);
}

.url p:last-child {
  text-decoration: underline;
}

.lucky-text p:last-child {
  font-size: 30px;
  font-weight: 100;
}

#export {
  height: 150px;
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  box-shadow:
    0 5px 20px rgba(0, 0, 0, 0.19),
    0 3px 3px rgba(0, 0, 0, 0.21);
}

#file {
  display: none;
}

#download-button, #share-button {
  cursor: pointer;
  box-sizing: border-box;
  width: 200px;
  height: 50px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 16px;
  font-weight: 600;
  color: var(--tag-font-color);
  background-color: var(--font-color);
  border: 1px solid var(--tag-color);
  border-radius: 20px;
}

#download-button:hover, #share-button:hover {
  color: var(--sky-color);
  border-color: var(--sky-color);
}

.download-logo {
  width: 25px;
  height: 25px;
  background-image: url('@/assets/images/download.svg');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
.share-logo {
  width: 25px;
  height: 25px;
  background-image: url('@/assets/images/share.svg');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
