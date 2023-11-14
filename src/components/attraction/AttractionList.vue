<script setup>
import { ref, onMounted } from 'vue'
// 공공데이터는 일단 제외
// import {
//   getsearchOptionList,
//   getKeywordAttractionList,
//   getAreaBasedAttractionList
// } from '@/api/AttractionAPI.js'
import {
  initMap,
  displayMarker,
  drawLine,
  searchPlacesByKeyword,
  search,
  searchByCategory,
  setMapByArea
} from '@/util/kakaomap-commons.js'
//import AttractionListRow from './AttractionListRow.vue'
// let searchOptions = ref([])
const areaCode = ref(0)
const contentTypeId = ref('')
// const keyword = ref('')
// const tripList = ref([])
// onMounted(async () => {
//   searchOptions.value = await getsearchOptionList()
//   console.log(searchOptions.value)
// })

// async function searchAttraction() {
//   console.log('search')
//   const params = { listYN: 'Y', arrange: 'A', numOfRows: 10, pageNo: 1 }
//   if (areaCode.value != 0) params.areaCode = areaCode.value
//   if (contentTypeId.value != 0) params.contentTypeId = contentTypeId.value
//   if (keyword.value != null && keyword.value.length > 0) {
//     params.keyword = keyword.value
//     tripList.value = await getKeywordAttractionList(params)
//   } else {
//     tripList.value = await getAreaBasedAttractionList(params)
//   }
//   console.log(tripList.value)
// }

// 아래는 KakaoMap.vue에 있던 코드

let map
const paths = [
  new kakao.maps.LatLng(126.97053, 37.56664),
  new kakao.maps.LatLng(126.97453, 37.57064),
  new kakao.maps.LatLng(126.97053, 37.57064)
]
const searchKeyword = ref('')
const searchList = ref([])
const checkedList = ref([])
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

function checkPlace(checked) {
  checkedList.value.push(checked)
  displayMarker({ y: checked.y, x: checked.x }, map)
}
onMounted(() => {
  if (window.kakao && window.kakao.maps) {
    map = initMap('map')
    // displayMarker({ y: 37.56664, x : 126.97053 }, map1);
    // displayMarker({ y: 33.450701, x : 126.570667 }, map2);
    drawLine(map, paths)
    // searchPlacesByKeyword('이태원 맛집', (data) => {
    //   searchList.value = data
    // })
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
        </div>
      </div>

      <hr />

      <!-- 검색 결과를 나타내는 곳 -->
      <div class="search-result">
        <div class="search-result-logo"></div>
        <div class="search-result-list">
          <ul class="result">
            <template v-for="search in searchList">
              <li v-if="searchList.length" :key="search.id" @click="checkPlace(search)">
                <span>{{ search.place_name }}</span>
                <span>{{ search.address_name }}</span>
              </li>
            </template>
          </ul>
        </div>
      </div>
      <!-- 여행 플랜 저장 - 최대 5개 제한 -->
      <div class="plan"></div>
    </div>

    <!-- 카카오 map이 들어갈 곳-->
    <div id="map"></div>
  </div>
</template>

<style scoped>
#wrap {
  width: 100%;
  height: 100%;
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
  overflow: scroll;
}

#map {
  width: 100%;
  height: 95%;
  border-radius: 15px;
  box-shadow:
    0 5px 20px rgba(0, 0, 0, 0.19),
    0 3px 3px rgba(0, 0, 0, 0.21);
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
  cursor: pointer;
  width: 95%;
  box-sizing: border-box;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  background-color: var(--map-color);
  border: none;
  border-radius: 4px;
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
  box-shadow: 0 0 0 2px var(--sky-color) inset;
}
</style>
