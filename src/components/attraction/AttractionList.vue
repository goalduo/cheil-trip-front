<script setup>
import { ref, onMounted } from 'vue'
import {
  getsearchOptionList,
  getKeywordAttractionList,
  getAreaBasedAttractionList
} from '@/api/AttractionAPI.js'
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
</script>

<template>
  <div class="wrap">
    <div class="">
      <div>
        <!-- 지역 옵션 선택하기 -->
        <select name="" id="">
          <option value=""></option>
        </select>

        <!-- 검색지 유형 선택하기 -->
        <select name="" id="">
          <option value=""></option>
        </select>

        <!-- 여행지 검색하는 input 요소 -->
        <input id="" />
      </div>

      <!-- 검색 결과를 나타내는 곳 -->
      <div class="search"></div>
      <!-- 여행 플랜 저장 - 최대 5개 제한 -->
      <div class="plan"></div>
    </div>

    <!-- 카카오 map이 들어갈 곳-->
    <div id="map"></div>
  </div>

  <!-- 분기선 -->

  <div class="container mt-5">
    <div class="row">
      <!-- 중앙 left content end -->
      <!-- 중앙 center content end -->
      <div class="col-md-6">
        <div id="localAreaInfo" class="alert alert-primary mt-3 text-center fw-bold" role="alert">
          {{ user_area }} 관광지 정보
        </div>
        <!-- 관광지 검색 start -->
        <form class="d-flex my-3" onsubmit="return false;" role="search">
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
        </form>

        <!-- kakao map start -->
        <!-- <div id="map" class="mt-3" style="width: 100%; height: 400px"></div> -->
        <!-- kakao map end -->

        <!-- 관광지 검색 end -->
      </div>
      <!-- <div class="row col-6">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th>대표이미지</th>
                    <th>관광지명</th>
                    <th>주소</th>
                    <th>위도</th>
                    <th>경도</th>
                </tr>
                </thead>
                <attraction-list-row v-for="trip in tripList" :key="trip.contentid" v-bind= "trip"/>
            </table>
    </div> -->
    </div>
  </div>
</template>

<style scoped></style>
