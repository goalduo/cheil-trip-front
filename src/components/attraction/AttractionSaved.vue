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
  removeLine,
  searchPlacesByKeyword,
  search,
  searchByCategory,
  setMapByArea
} from '@/util/kakaomap-commons.js'
import { findById } from '@/api/UserAPI.js'
import {postTripPlanAndTripCourse, getTripplanId, addUserIdAtAttraction} from '@/api/TripplanAPI.js'
import { useMemberStore } from "@/stores/member";
const memberStore = useMemberStore();
const { userInfo } = storeToRefs(memberStore)
//import AttractionListRow from './AttractionListRow.vue'
// let searchOptions = ref([])

const router = useRouter()
const areaCode = ref(0)
const contentTypeId = ref('')

const tripplanTitle = ref("");
const tripplanHashtag = ref("");

let map
const searchKeyword = ref('')
const searchList = ref([])

function displaysearchKeyword() {
  if (areaCode.value !== 0) {
    search(
      searchKeyword.value,
      map,
      (response) => {
        searchList.value = response
      },
      {
        location: new kakao.maps.LatLng(map.getCenter().getLat(), map.getCenter().getLng()),
        radius: 5000
      }
    )
  } else {
    search(
      searchKeyword.value,
      map,
      (response) => {
        searchList.value = response
      },
      {}
    )
  }
}

const isAreaSelected = ref(new Array(17))
isAreaSelected.value.fill(false)

function displayArea(code, lat, lng) {
  // 기존에 있던 코드와 같으면 취소
  if (areaCode.value === code) {
    areaCode.value = 0
    isAreaSelected.value[code - 1] = false
    return
  }

  areaCode.value = code
  isAreaSelected.value.map((_, index) => {
    if (index === code - 1) isAreaSelected.value[index] = true
    else isAreaSelected.value[index] = false
  })
  setMapByArea(map, lat, lng)
}

// 새로 만든 함수
function displaysearchCategory(code) {
  contentTypeId.value = code
  searchByCategory(contentTypeId.value, map, (response) => {
    searchList.value = response
  })
}

onMounted(() => {
  if (window.kakao && window.kakao.maps) {
    map = initMap('map')
  }
})

const tripAreaObject = {
  0: { rnum: 1, lat: 37.556099, lng: 126.972371, name: '서울' },
  1: { rnum: 2, lat: 36.331643, lng: 127.433655, name: '대전' },
  2: { rnum: 3, lat: 35.115277, lng: 129.04224, name: '부산' },
  3: { rnum: 4, lat: 35.879802, lng: 128.628496, name: '대구' },
  4: { rnum: 5, lat: 37.764002, lng: 128.9017, name: '강릉' },
  5: { rnum: 6, lat: 36.794723, lng: 127.104594, name: '천안' },
  6: { rnum: 7, lat: 36.625648, lng: 127.433981, name: '청주' },
  7: { rnum: 8, lat: 35.13835, lng: 126.792492, name: '광주' },
  8: { rnum: 9, lat: 35.84463, lng: 129.21793, name: '경주' },
  9: { rnum: 10, lat: 35.94244, lng: 126.948073, name: '익산' },
  10: { rnum: 11, lat: 36.071834, lng: 129.341956, name: '포항' },
  11: { rnum: 12, lat: 34.753337, lng: 127.748982, name: '여수' },
  12: { rnum: 13, lat: 35.551558, lng: 129.138941, name: '울산' },
  13: { rnum: 14, lat: 37.476509, lng: 126.617011, name: '인천' },
  14: { rnum: 15, lat: 37.736811, lng: 127.046963, name: '의정부' },
  15: { rnum: 16, lat: 37.884585, lng: 127.7166, name: '춘천' },
  16: { rnum: 17, lat: 33.507206, lng: 126.493237, name: '제주' }
}

// 유형은 정적인 객체
const tripTypeObject = {
  0: { rnum: 1, code: 'AT4', name: '관광명소' },
  1: { rnum: 2, code: 'CT1', name: '문화시설' },
  2: { rnum: 3, code: 'FD6', name: '음식점' },
  3: { rnum: 4, code: 'CE7', name: '카페' },
  4: { rnum: 5, code: 'SW8', name: '지하철역' },
  5: { rnum: 6, code: 'OL7', name: '주유소' },
  6: { rnum: 7, code: 'PK6', name: '주차장' },
  7: { rnum: 8, code: 'AD5', name: '숙박' },
  8: { rnum: 9, code: 'MT1', name: '대형마트' }
}

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
  for (const tripCourse of tripCourseList.value) {
    tripCourseLatLng.push(new kakao.maps.LatLng(tripCourse.y, tripCourse.x))
  }

  drawLine(polyline, map, tripCourseLatLng)
}

function removeCourseLine() {
  removeLine(polyline)
}

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


// 여행 정보 저장하기
function saveTripplan() {
  const body = {
    planName: tripplanTitle.value,
    tripCourseList : tripCourseList.value
  }
  postTripPlanAndTripCourse(body);
}
</script>

<template>
  <div id="wrap">
    <div id="info">
      <div class="plan-result">
        <div class="plan-result-logo"></div>
        <!-- 여행 경로 제목 -->
        <div class="title-wrap">
          <p class="title-label">제목</p>
          <p class="title">해동용궁사에서 용을 보다. 너넨 용을 본적이 있어?</p>
        </div>

        <!-- 여행 경로 태그 -->
        <div class="tag-wrap">
          <p class="tag-label">태그</p>
          <ul class="tag">
            <li>#용</li>
            <li>#해동용궁사</li>
            <li>#부산</li>
            <li>#하핫</li>
          </ul>
        </div>

        <!-- 여행 경로 리스트 -->
        <div class="plan-wrap">
          <p class="plan-label">경로</p>
          <ul class="result">
            <!-- <template v-for="search in searchList">
              <li v-if="searchList.length" :key="search.id" @click="showPlace(search)">
                <div class="span-group">
                  <span>{{ search.place_name }}</span>
                  <span>{{ search.address_name }}</span>
                </div>
                <div @click="addPlace(search)" class="plus-button"></div>
              </li>
            </template> -->
            <li>
              <div class="span-group">
                <span>제주 올레길</span>
                <span>제주 얼레벌레 올레길 가보고 싶다 한라산도</span>
              </div>
            </li>
            <li>
              <div class="span-group">
                <span>제주 올레길</span>
                <span>제주 얼레벌레 올레길 가보고 싶다 한라산도</span>
              </div>
            </li>
            <li>
              <div class="span-group">
                <span>제주 올레길</span>
                <span>제주 얼레벌레 올레길 가보고 싶다 한라산도</span>
              </div>
            </li>
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
