<script setup>
import { onMounted } from "vue";
import { initMap, displayMarker, drawLine, searchPlacesByKeyword } from '@/util/kakaomap-commons.js';
let map1, map2;
const paths = [new kakao.maps.LatLng(37.56664, 126.97053),new kakao.maps.LatLng(37.57064, 126.97453),new kakao.maps.LatLng(37.57064, 126.97053)];

onMounted(() => {
    if (window.kakao && window.kakao.maps) {
      map1 = initMap("map1");
      map2 = initMap("map2");
      displayMarker({ Lat: 37.56664, Lng : 126.97053 }, map1);
      displayMarker({ Lat: 33.450701, Lng: 126.570667 }, map2);
      drawLine(map1, paths);
      const result = searchPlacesByKeyword("이태원 맛집")
      // console.log(result)
    } 
})

</script>

<template>
    <div id = "map1"></div>
    <div id= "map2"></div>
    <div id = "searchList">검색 리스트</div>
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