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
  search,
  searchByCategory,
  setMapByArea
} from '@/util/kakaomap-commons.js'
import { findById } from '@/api/UserAPI.js'
import {postTripPlanAndTripCourse, getTripplanId, addUserIdAtAttraction} from '@/api/TripplanAPI.js'
import { useMemberStore } from "@/stores/member";
import { notify } from '@/components/toastMessage.js'

const memberStore = useMemberStore();
const { userInfo } = storeToRefs(memberStore)

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

// 여행 경로 저장하기 창 열고 닫기 조절
const isTripCourseSaveOpen = ref(false)
const convertOpenState = () => {
  isTripCourseSaveOpen.value = !isTripCourseSaveOpen.value
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
    map,
    'UNORDERED'
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

// 여행 장소를 경로에 추가할 때
function addPlace(location) {
  showPlace(location)
  // 여행 경로의 길이는 5를 넘을 수 없음
  if (tripCourseList.value.length < 5) {
    tripCourseList.value.push(location)
    // 경로 다시 그리기
    drawCourseLine()
  }
  else notify('FAIL', '경로는 5개까지 지정할 수 있습니다!')

  // console.log(tripCourseList.value)
  isTripCourseSaveOpen.value = true
}

// 여행 장소를 경로에서 제거할 때
function removePlace(location) {
  tripCourseList.value.splice(tripCourseList.value.indexOf(location), 1)
  // 경로 삭제 후 다시 그리기
  removeCourseLine()
  drawCourseLine()
}

const isOnCreateTripCourse = ref(false)
// 제목 정하기가 해시 태그보다 앞이므로 초기값은 true
const isOnSetTitle = ref(true)

// 경로 설정 후 저장하기 버튼을 누르면 제목 설정 단계로 돌입
function goToSetTitle() {
  isTripCourseSaveOpen.value = false
  isOnCreateTripCourse.value = true
}

// 제목 설정 후 계속하기 버튼을 누르면 해시태그 설정 단계로 돌입
function goToSetHashTag() {
  isOnSetTitle.value = false
}

const tags = ref([])
const tag = ref('')
const isInputAvailable = ref(true)

const onChangeTagInputValue = (event) => {
  tag.value = event.target.value
  // console.log(tag.value)
}

const addTag = (event) => {
  if (tag.value.length > 0 && tags.value.length < 5) {
    tags.value.push(tag.value.trim())
    tag.value = ''
  }
  if (tags.value.length === 5) isInputAvailable.value = false
}

const removeTag = (index) => {
  tags.value.splice(index, 1)
  if (tags.value.length < 5) isInputAvailable.value = true
}

// 취소 버튼 누르면 여행 경로 생성 취소
function cancelTripCourse() {
  tripCourseList.value.length = 0
  isOnCreateTripCourse.value = false
  isOnSetTitle.value = true
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
    hashtags: tags.value.join("-"),
    tripCourseList : tripCourseList.value
  }
  postTripPlanAndTripCourse(body);
  alert("여행 경로가 저장되었습니다.");
  router.push('/plan')
}
</script>

<template>
  <div id="wrap">
    <div id="info">
      <div class="search">
        <div class="search-logo"></div>
        <!-- 지역 옵션 선택하기 -->
        <p class="pick-area">지역 고르기</p>
        <ul class="area">
          <li v-for="tripArea in tripAreaObject" :key="tripArea.rnum">
            <button
              :class="{ 'area-selected': isAreaSelected[tripArea.rnum - 1] }"
              @click="displayArea(tripArea.rnum, tripArea.lat, tripArea.lng)"
            >
              {{ tripArea.name }}
            </button>
          </li>
        </ul>

        <!-- 검색지 유형 선택하기 -->
        <p class="pick-type">유형 고르기</p>
        <ul class="type">
          <li v-for="tripType in tripTypeObject" :key="tripType.rnum">
            <button @click="displaysearchCategory(tripType.code)">
              {{ tripType.name }}
            </button>
          </li>
        </ul>

        <!-- 여행지 검색하는 input 요소 -->
        <p class="insert-text">검색어 입력하기</p>
        <div class="search-input">
          <input
            v-model="searchKeyword"
            @keyup.enter="displaysearchKeyword"
            type="text"
            placeholder="검색어 입력"
          />
          <img
            @click="displaysearchKeyword"
            src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/icon/search.png"
          />
          <br/>
          <input
            v-model="searchedUser"
            type="text"
            placeholder="사용자 검색"
          />
          <button @click="changeWorkspaceToShare">공유하기</button>
          <div></div>
          <div @click="inviteUser"> {{  searchresultUser }} </div>
        </div>
      </div>

      <hr />

      <!-- 검색 결과를 나타내는 곳 -->
      <div class="search-result">
        <div class="search-result-logo"></div>
        <div class="search-result-list">
          <ul class="result">
            <template v-for="search in searchList">
              <li v-if="searchList.length" :key="search.id" @click="showPlace(search)">
                <div class="span-group">
                  <span>{{ search.place_name }}</span>
                  <span>{{ search.address_name }}</span>
                </div>
                <div @click="addPlace(search)" class="plus-button"></div>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </div>

    <!-- 카카오 map이 들어갈 곳-->
    <div id="map">
      <!-- 여행 경로 저장 - 최대 5개 제한 -->
      <div v-show="isTripCourseSaveOpen && !isOnCreateTripCourse" class="plan">
        <div class="plan-header">
          <div class="plan-logo"></div>
          <div @click="convertOpenState" class="up-down-button"></div>
        </div>

        <ul v-for="place in tripCourseList" class="plan-list">
          <li :key="place.id">
            <span>{{ place.place_name }}</span>
            <div @click="removePlace(place)" class="minus-button"></div>
          </li>
        </ul>

        <span class="warning-text">여행 경로는 최대 5개까지 지정할 수 있습니다.</span>

        <div class="button-group">
          <button @click="goToSetTitle" class="save-button">저장하기</button>
          <button @click="cancelTripCourse" class="cancel-button">취소</button>
        </div>
      </div>
      <!-- 여행 경로 저장 창 숨기기 -->
      <div v-show="!isTripCourseSaveOpen && !isOnCreateTripCourse" class="plan-hide">
        <div class="plan-header">
          <div class="plan-logo"></div>
          <div @click="convertOpenState" class="up-down-button"></div>
        </div>
      </div>

      <!-- 여행 경로 제목 정하기 -->
      <div v-show="isOnCreateTripCourse && isOnSetTitle" class="plan-title">
        <p>여행 경로의 제목 정하기</p>
        <input type="text" v-model="tripplanTitle"/>
        <div class="button-group">
          <button @click="goToSetHashTag" class="save-button">계속하기</button>
          <button @click="cancelTripCourse" class="cancel-button">취소</button>
        </div>
      </div>

      <!-- 여행 해시 태그 정하기 -->
      <div v-show="isOnCreateTripCourse && !isOnSetTitle" class="tag-wrap">
        <p>여행 경로의 해시 태그 정하기</p>
        <!-- <input type="text" v-model="tripplanHashtag"/> -->
        <div class="tag-input">
          <div v-for="(tag, index) in tags" :key="index" class="tagging">
            {{ tag }}
            <span @click="removeTag(index)">x</span>
          </div>
          <input
            v-show="isInputAvailable"
            :value="tag"
            @input="onChangeTagInputValue"
            @keypress.enter.prevent="addTag"
            type="text"
            placeholder="태그를 추가해보세요!"
            class="tag-text"
          />
        </div>
        <div class="button-group">
          <button class="save-button" @click="saveTripplan">최종 저장하기</button>
          <button @click="cancelTripCourse" class="cancel-button">취소</button>
        </div>
      </div>
    </div>
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

.plan {
  position: absolute;
  top: 30px;
  left: 30px;
  width: 400px;
  box-sizing: border-box;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: var(--font-color);
  border-radius: 15px;
  z-index: 10;
}

.plan-hide {
  position: absolute;
  top: 30px;
  left: 30px;
  width: 400px;
  box-sizing: border-box;
  padding: 15px;
  background-color: var(--font-color);
  border-radius: 15px;
  z-index: 10;
}

.plan-title,
.tag-wrap {
  position: absolute;
  top: 30px;
  left: 30px;
  width: 600px;
  box-sizing: border-box;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: var(--font-color);
  border-radius: 15px;
  z-index: 10;
}

.tag-input {
  box-sizing: border-box;
  height: 60px;
  padding: 15px;
  display: flex;
  gap: 10px;
  font-size: 16px;
  font-weight: 600;
  border: 1px solid var(--tag-color);
  border-radius: 4px;
  outline-color: var(--sky-color);
  overflow: hidden;
}

.tag-input span {
  cursor: pointer;
  opacity: 0.75;
}

.tagging {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px;
  background-color: var(--tag-color);
  border-radius: 5px;
}

.tag-text {
  font-size: 16px;
  border: none;
  outline: none;
}

.plan-title p,
.tag-wrap p {
  font-size: 15px;
  font-weight: 800;
  color: var(--sky-color);
}

.plan-title input {
  padding: 20px;
  font-size: 16px;
  border: 1px solid var(--tag-color);
  border-radius: 4px;
  outline-color: var(--sky-color);
}

.plan-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.plan-logo {
  width: 200px;
  height: 30px;
  margin-bottom: -5px;
  margin-left: -5px;
  background-image: url('@/assets/images/plan-logo.svg');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

.up-down-button {
  cursor: pointer;
  width: 23px;
  height: 23px;
  background-image: url('@/assets/images/up-down-button.svg');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

.plan-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.plan-list li {
  box-sizing: border-box;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
  background-color: var(--map-color);
  border: none;
  border-radius: 4px;
}

.plan-list li span {
  font-size: 18px;
  font-weight: 600;
}

.plan-list li .minus-button {
  cursor: pointer;
  width: 25px;
  height: 25px;
  background-image: url('@/assets/images/minus-button.svg');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

.warning-text {
  font-size: 11px;
  font-weight: 200;
  text-align: right;
}

.button-group {
  padding: 10px;
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
}

.button-group button {
  cursor: pointer;
  width: fit-content;
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

.save-button:hover {
  color: var(--sky-color);
  border-color: var(--sky-color);
}

.cancel-button:hover {
  color: var(--minus-button-color);
  border-color: var(--minus-button-color);
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
  border-radius: 15px 0 0 15px;
  box-shadow:
    0 5px 20px rgba(0, 0, 0, 0.19),
    0 3px 3px rgba(0, 0, 0, 0.21);
  overflow-y: scroll;
}

.search-logo {
  width: 110px;
  height: 35px;
  margin-left: -10px;
  background-image: url('@/assets/images/search-logo.svg');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

.search {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.pick-area,
.pick-type,
.insert-text {
  margin-bottom: -15px;
  font-size: 15px;
  font-weight: 800;
  color: var(--sky-color);
}

.pick-area::after {
  content: ' : 빠르게 다른 지역으로 이동하세요!';
  font-weight: 400;
  font-size: 11px;
  color: var(--fourth-font-color);
}

.pick-type::after {
  content: ' : 지도 근처에서 장소 유형을 선택할 수 있어요!';
  font-weight: 400;
  font-size: 11px;
  color: var(--fourth-font-color);
}

.insert-text::after {
  content: ' : 지역 근처나 전국에서 찾고자하는 장소를 검색해보세요!';
  font-weight: 400;
  font-size: 11px;
  color: var(--fourth-font-color);
}

.area,
.type {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.area li button,
.type li button {
  cursor: pointer;
  width: fit-content;
  height: 30px;
  padding: 0 10px;
  font-size: 16px;
  font-weight: 300;
  color: var(--tag-font-color);
  background-color: var(--font-color);
  border: 1px solid var(--tag-color);
  border-radius: 20px;
}

.area li .area-selected {
  color: var(--sky-color);
  border-color: var(--sky-color);
}

.area li button:hover,
.type li button:hover {
  color: var(--sky-color);
  border-color: var(--sky-color);
}

.search-input {
  width: 75%;
  display: flex;
  align-items: center;
  border: 1px solid var(--tag-color);
  border-radius: 4px;
}

.search-input input {
  cursor: text;
  box-sizing: border-box;
  width: 95%;
  padding: 10px 12px;
  border: none;
  border-radius: 4px 0 0 4px;
  border-right: 1px solid var(--tag-color);
  font-size: 18px;
  outline: none;
}

.search-input img {
  cursor: pointer;
  width: 20px;
  margin: 0 10px;
}

hr {
  margin: 20px -10px;
}

.search-result {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.search-result-logo {
  width: 110px;
  height: 35px;
  margin: -5px;
  background-image: url('@/assets/images/search-result-logo.svg');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

.result {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.result li {
  width: 95%;
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

.plus-button {
  cursor: pointer;
  width: 25px;
  height: 25px;
  background-image: url('@/assets/images/plus-button.svg');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
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
