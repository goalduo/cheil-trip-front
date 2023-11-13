<script setup>
import { ref, onMounted } from 'vue'
import {
  getsearchOptionList,
  getKeywordAttractionList,
  getAreaBasedAttractionList
} from '@/api/AttractionAPI.js'
import {
  initMap,
  displayMarker,
  drawLine,
  searchPlacesByKeyword,
  search
} from '@/util/kakaomap-commons.js'
import AttractionListRow from './AttractionListRow.vue'
let searchOptions = ref([])
const areaCode = ref(0)
const contentTypeId = ref(0)
const keyword = ref('')
const tripList = ref([])
onMounted(async () => {
  searchOptions.value = await getsearchOptionList()
  console.log(searchOptions)
})

async function searchAttraction() {
  console.log('search')
  const params = { listYN: 'Y', arrange: 'A', numOfRows: 10, pageNo: 1 }
  if (areaCode.value != 0) params.areaCode = areaCode.value
  if (contentTypeId.value != 0) params.contentTypeId = contentTypeId.value
  if (keyword.value != null && keyword.value.length > 0) {
    params.keyword = keyword.value
    tripList.value = await getKeywordAttractionList(params)
  } else {
    tripList.value = await getAreaBasedAttractionList(params)
  }
}

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
  search(searchKeyword.value, map, (response) => {
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
    searchPlacesByKeyword('이태원 맛집', (data) => {
      searchList.value = data
    })
  }
})
</script>

<template>
  <div id="wrap">
    <div id="info">
      <div class="search">
        <div class="search-logo"></div>
        <!-- 지역 옵션 선택하기 -->
        <p>지역 고르기</p>
        <ul class="area">
          <li v-for="searchOption in searchOptions" :key="searchOption.rnum">
            <button @click="">{{ searchOption.name }}</button>
          </li>
        </ul>

        <!-- 검색지 유형 선택하기 -->
        <p>유형 고르기</p>
        <ul class="type">
          <li>
            <button>관광지</button>
          </li>
          <li>
            <button>문화시설</button>
          </li>
          <li>
            <button>축제공연행사</button>
          </li>
          <li>
            <button>여행코스</button>
          </li>
          <li>
            <button>레포츠</button>
          </li>
          <li>
            <button>숙박</button>
          </li>
          <li>
            <button>쇼핑</button>
          </li>
          <li>
            <button>음식점</button>
          </li>
        </ul>

        <!-- 여행지 검색하는 input 요소 -->
        <p>검색어 입력하기</p>
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

  <!-- 분기선 -->

  <!-- <div class="container mt-5">
    <div class="row"> -->
  <!-- 중앙 left content end -->
  <!-- 중앙 center content end -->
  <!-- <div class="col-md-6">
        <div id="localAreaInfo" class="alert alert-primary mt-3 text-center fw-bold" role="alert">
          {{ user_area }} 관광지 정보
        </div> -->
  <!-- 관광지 검색 start -->
  <!-- <form class="d-flex my-3" onsubmit="return false;" role="search">
          <select class="form-select me-2" v-model="areaCode">
            <option
              v-for="searchOption in searchOptions"
              :key="searchOption.rnum"
              :value="searchOption.code"
            >
              {{ searchOption.name }}
            </option>
          </select>
          <select id="search-content-id" class="form-select me-2">
            <option value="0" selected>관광지 유형</option>
            <option value="12">관광지</option>
            <option value="14">문화시설</option>
            <option value="15">축제공연행사</option>
            <option value="25">여행코스</option>
            <option value="28">레포츠</option>
            <option value="32">숙박</option>
            <option value="38">쇼핑</option>
            <option value="39">음식점</option>
          </select>
          <input
            id="search-keyword"
            class="form-control me-2"
            type="search"
            placeholder="검색어"
            aria-label="검색어"
            v-model="keyword"
          />
          <button
            id="btn-search"
            class="btn btn-outline-success"
            type="button"
            @click="searchAttraction"
          >
            검색
          </button>
        </form> -->

  <!-- kakao map start -->
  <!-- <div id="map" class="mt-3" style="width: 100%; height: 400px"></div> -->
  <!-- kakao map end -->

  <!-- 관광지 검색 end -->
  <!-- </div> -->
  <!-- </div>
  </div> -->
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

.search p {
  margin-bottom: -15px;
  font-size: 15px;
  font-weight: 800;
  color: var(--sky-color);
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
  height: 480px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-wrap: nowrap;
  overflow-y: auto;
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
