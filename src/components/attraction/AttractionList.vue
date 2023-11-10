<script setup>
import { ref, onMounted } from 'vue'
import { getsearchOptionList, getKeywordAttractionList, getAreaBasedAttractionList } from '@/api/AttractionAPI.js';
import AttractionListRow from "./AttractionListRow.vue";
let searchOptions = ref([]);
const areaCode = ref(0);
const contentTypeId = ref(0);
const keyword = ref("");
const tripList = ref([]);
onMounted(async() => {
    searchOptions.value = await getsearchOptionList();
    console.log(searchOptions);
})

async function searchAttraction() {
    console.log('search');
    const params = { listYN: 'Y', arrange : 'A', numOfRows : 10, pageNo : 1}
    if (areaCode.value != 0) params.areaCode = areaCode.value
    if (contentTypeId.value != 0) params.contentTypeId = contentTypeId.value
    if (keyword.value != null && keyword.value.length > 0) {
        params.keyword = keyword.value
        tripList.value = await getKeywordAttractionList(params)
    } else {
        tripList.value = await getAreaBasedAttractionList(params)
    }
}
    // ~~index page 로딩 후 전국의 시도 설정.~~
    // 특정 지역의 정보 선택


    // 카카오맵
    // var positions; // marker 배열.
    // function makeList(data) {
    //     document.querySelector("table").setAttribute("style", "display: ;");
    //     let trips = data.response.body.items.item;
    //     let tripList = ``;
    //     positions = [];
    //     trips.forEach((area) => {
    //         tripList += `
    //         <tr onclick="moveCenter(\${area.mapy}, \${area.mapx});">
    //           <td><img src="\${area.firstimage}" width="100px"></td>
    //           <td>\${area.title}</td>
    //           <td>\${area.addr1} \${area.addr2}</td>
    //           <td>\${area.mapy}</td>
    //           <td>\${area.mapx}</td>
    //         </tr>
    //       `;

    //         let markerInfo = {
    //             title: area.title,
    //             latlng: new kakao.maps.LatLng(area.mapy, area.mapx),
    //         };
    //         positions.push(markerInfo);
    //     });
    //     document.getElementById("trip-list").innerHTML = tripList;
    //     displayMarker();
    // }

    // // 카카오지도
    // var mapContainer = document.getElementById("map"), // 지도를 표시할 div
    //     mapOption = {
    //         center: new kakao.maps.LatLng(37.500613, 127.036431), // 지도의 중심좌표
    //         level: 5, // 지도의 확대 레벨
    //     };

    // // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
    // var map = new kakao.maps.Map(mapContainer, mapOption);

    // function displayMarker() {
    //     // 마커 이미지의 이미지 주소입니다
    //     var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

    //     for (var i = 0; i < positions.length; i++) {
    //         // 마커 이미지의 이미지 크기 입니다
    //         var imageSize = new kakao.maps.Size(24, 35);

    //         // 마커 이미지를 생성합니다
    //         var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

    //         // 마커를 생성합니다
    //         var marker = new kakao.maps.Marker({
    //             map: map, // 마커를 표시할 지도
    //             position: positions[i].latlng, // 마커를 표시할 위치
    //             title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
    //             image: markerImage, // 마커 이미지
    //         });
    //     }

    //     // 첫번째 검색 정보를 이용하여 지도 중심을 이동 시킵니다
    //     map.setCenter(positions[0].latlng);
    // }

    // function moveCenter(lat, lng) {
    //     map.setCenter(new kakao.maps.LatLng(lat, lng));
    // }

</script>


<template>
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
                    <option v-for="searchOption in searchOptions" 
                    :key="searchOption.rnum" 
                    :value="searchOption.code">{{searchOption.name}}</option>
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
                <button id="btn-search" class="btn btn-outline-success" type="button" @click="searchAttraction">검색</button>
            </form>

            <!-- kakao map start -->
            <div id="map" class="mt-3" style="width: 100%; height: 400px"></div>
            <!-- kakao map end -->

            <!-- 관광지 검색 end -->
        </div>
        <div class="row col-6">
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
    </div>
    </div>
    </div>
</template>

<style scoped>

</style>