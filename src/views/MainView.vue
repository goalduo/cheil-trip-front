<script setup>
import NavHeader from '../components/NavHeader.vue'
import MainContent from '../components/MainContent.vue'
import SitemapFooter from '../components/SitemapFooter.vue'

import { ref } from 'vue'

const mouseX = ref(0)
const mouseY = ref(0)

const mouseMove = (event) => {
  mouseX.value = event.pageX + 5
  mouseY.value = event.pageY + 5
}
</script>

<template>
  <!-- 마우스를 따라다닐 수 있는 이미지의 이동 허용 범위 -->
  <div id="wrap" @mousemove="mouseMove">
    <div id="cursor" :style="{ left: mouseX + 'px', top: mouseY + 'px' }">
      <img id="paperplane-image" src="../assets/images/paperplane.svg" />
    </div>

    <!-- 헤더 -->
    <NavHeader></NavHeader>
    <!-- 메인 컨텐츠 -->
    <MainContent></MainContent>
    <!-- 푸터 -->
    <SitemapFooter></SitemapFooter>
  </div>
</template>

<style scoped>
#wrap {
  position: relative;
  width: 100%;
}

#cursor {
  position: absolute;
  z-index: 999;
}

#paperplane-image {
  width: 60px;
  transform: scaleX(-1);
}
</style>
