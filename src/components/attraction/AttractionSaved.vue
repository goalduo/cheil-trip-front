<script setup>
import yorkie from 'yorkie-js-sdk';
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import {
  initMap,
  displayMarker,
  createLine,
  drawLine,
  removeLine
} from '@/util/kakaomap-commons.js'
import { findById } from '@/api/UserAPI.js'
import {getTripPlanAndTripCoursesByPlanId, getTripplanId, addUserIdAtAttraction} from '@/api/TripplanAPI.js'
import { useMemberStore } from "@/stores/member";
const memberStore = useMemberStore();
const { userInfo } = storeToRefs(memberStore)
//import AttractionListRow from './AttractionListRow.vue'
// let searchOptions = ref([])

const tripPlan = ref({})

let map

onMounted(async () => {
  if (window.kakao && window.kakao.maps) {
    map = initMap('map')
  }

  tripPlan.value = await getTripPlanAndTripCoursesByPlanId(6)
  tripPlan.value.hashtags = tripPlan.value.hashtags.split('-')

  tripPlan.value.tripCourseList.forEach(location => {
    showPlace(location)
    drawCourseLine()
  })
})

// 여행 경로 저장하기
const tripCourseList = ref([])

// 장소를 클릭할 때 카카오맵 center 다시 지정
function showPlace(location) {
  displayMarker(
    {
      y: location.y,
      x: location.x,
      place_name: location.place_name,
      address_name: location.address_name,
      category_group_name: location.category_group_name
    },
    map
  )
}

let polyline = createLine()
// 여행 장소를 경로에 추가하거나 제거할 시에 다시 경로 그리기
function drawCourseLine() {
  const tripCourseLatLng = []
  for (const tripCourse of tripPlan.value.tripCourseList) {
    tripCourseLatLng.push(new kakao.maps.LatLng(tripCourse.y, tripCourse.x))
  }

  drawLine(polyline, map, tripCourseLatLng)
}

// function removeCourseLine() {
//   removeLine(polyline)
// }

// 공유하기 버튼을 누르면 워크스페이스 변경
async function changeWorkspaceToShare() {
  const id = await getTripplanId();
  const body = {
    planId: id,
    userId : userInfo.value.userId
  }
  console.log(body);
  await addUserIdAtAttraction(body);
  router.push({ name: 'attractionshare', params: { id }})
}

// 사용자 검색
const searchedUser = ref("");
const searchresultUser = ref("");
// function searchUser() {
//   findById(searchedUser.value, (response) => {
//     searchresultUser.value = response.data.userId
//   })
// }
// const invitedMessage = ref("");
// async function inviteUser() {
//   await client.activate();
//   await client.attach(doc);
//   doc.update((root) => {
//         if (!root.text) {
//           root.text = 'start';
//         }
//   }, 'create default list if not exists');
//   invitedMessage.value = doc.getRoot().text;
// }
</script>

<template>
  <div id="wrap">
    <div id="info">
      <div class="plan-result">
        <div class="plan-result-logo"></div>
        <!-- 여행 경로 제목 -->
        <div class="title-wrap">
          <p class="title-label">제목</p>
          <p class="title">{{ tripPlan.planName }}</p>
        </div>

        <!-- 여행 경로 태그 -->
        <div class="tag-wrap">
          <p class="tag-label">태그</p>
          <ul class="tag">
            <li v-for="tag in tripPlan.hashtags">#{{ tag }}</li>
          </ul>
        </div>

        <!-- 여행 경로 리스트 -->
        <div class="plan-wrap">
          <p class="plan-label">경로</p>
          <ul class="result">
            <template v-for="tripCourse in tripPlan.tripCourseList">
              <li>
                <div class="span-group">
                  <span>{{ tripCourse.place_name }}</span>
                  <span>{{ tripCourse.address_name }}</span>
                </div>
              </li>
            </template>
          </ul>
        </div>

      </div>
    </div>

    <!-- 카카오 map이 들어갈 곳-->
    <div id="map"></div>
  </div>
</template>

<style scoped>
#map {
  position: relative;
  width: 100%;
  height: 95%;
  border-radius: 15px;
  box-shadow:
    0 5px 20px rgba(0, 0, 0, 0.19),
    0 3px 3px rgba(0, 0, 0, 0.21);
}

#wrap {
  width: 100%;
  height: 100vh;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
  color: var(--fourth-font-color);
  background-color: var(--font-color);
}

#info {
  min-width: 400px;
  max-width: 500px;
  height: 95%;
  box-sizing: border-box;
  padding: 20px;
  border: none;
  border-radius: 15px;
  box-shadow:
    0 5px 20px rgba(0, 0, 0, 0.19),
    0 3px 3px rgba(0, 0, 0, 0.21);
}

.plan-result {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.plan-result-logo {
  width: 110px;
  height: 35px;
  margin-left: -10px;
  background-image: url('@/assets/images/plan-result-logo.svg');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

.title-wrap,
.tag-wrap,
.plan-wrap {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.title-label,
.tag-label,
.plan-label {
  font-size: 20px;
  font-weight: 800;
  color: var(--sky-color);
}

.title {
  font-size: 30px;
  font-weight: 600;
  word-break: keep-all;
}

.tag {
  display: flex;
  gap: 10px;
  font-size: 15px;
  font-style: italic;
  color: var(--tag-font-color);
}

.result {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.result li {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--map-color);
  border: none;
  border-radius: 4px;
}

.span-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.result li span:first-child {
  font-size: 18px;
  font-weight: 600;
}

.result li span:last-child {
  font-size: 16px;
  font-weight: 300;
}

.result li:hover {
  box-shadow: 0 0 0 1px var(--sky-color) inset;
}
</style>
