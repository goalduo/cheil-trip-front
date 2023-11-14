<script setup>
import { ref,onMounted } from "vue";
import { initMap, displayMarker, drawLine, searchPlacesByKeyword, search, setMarkerWithCustomOverlay } from '@/util/kakaomap-commons.js';
import { getTripplansAndTripCoursesByUserId } from "../../api/TripplanAPI";
let map1, map2;
const paths = [
  new kakao.maps.LatLng(126.97053, 37.56664),
  new kakao.maps.LatLng(126.97453, 37.57064),
  new kakao.maps.LatLng(126.97053, 37.57064)];
const searchKeyword = ref("");
const searchList = ref([]);
const checkedList = ref([]);
function displaysearchKeyword() {
  search(searchKeyword.value, map1, (response) => {
    console.log(response)
    searchList.value = response
  });
}
function checkPlace(checked) {
  checkedList.value.push(checked)
  displayMarker({y: checked.y, x: checked.x}, map2)
}
onMounted(() => {
    if (window.kakao && window.kakao.maps) {
      map1 = initMap("map1");
      map2 = initMap("map2");
      // displayMarker({ y: 37.56664, x : 126.97053 }, map1);
      // displayMarker({ y: 33.450701, x : 126.570667 }, map2);
      getTripplansAndTripCoursesByUserId().then(data => {
        data[0].tripCourseList.forEach(element => {
          setMarkerWithCustomOverlay(element, map1);
        });
      });
      
      drawLine(map1, paths);
      searchPlacesByKeyword("이태원 맛집", (data) => {
        searchList.value = data;
      })
    } 
})

</script>

<template>
    <div id = "map1"></div>
    <div id= "map2"></div>
    <div id = "searchList">검색 리스트</div>
    <input type="text" v-model="searchKeyword" @keyup.enter="displaysearchKeyword">
    <div v-for="search in searchList" :key="search.id" @click="checkPlace(search)">{{ search.place_name }}</div>
    <h2>clicked!</h2>
    <div v-for="check in checkedList" :key="check.id">{{ check.place_name }}</div>
</template>

<style scoped>
  #map1{
    width: 50%;
    height: 350px;
  }
  #map2{
    width: 50%;
    height: 350px;
  }
</style>