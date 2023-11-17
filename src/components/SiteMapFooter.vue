<script setup>
import SiteMapList from './SiteMapList.vue'

const siteMapLists = [
  {
    id: 0,
    elements: ['서비스', '여행지 검색', '여행카드 만들기', '게시판', '로그인', '회원가입']
  },
  {
    id: 1,
    elements: ['문의', '사업 제휴', '광고 문의', '커피 후원', '신고']
  },
  {
    id: 2,
    elements: ['고객센터', '전화', '이메일', '민원 접수']
  }
]
</script>

<template>
  <footer id="footer">
    <div class="site-map">
      <SiteMapList v-for="list in siteMapLists" :key="list.id" :list="list.elements"></SiteMapList>
    </div>

    <div class="copyright">
      <p class="info">대표 : 골때리는듀오</p>
      <p class="info">고객센터 : 서울특별시 강남구 역삼동 멀티캠퍼스 7층</p>
    </div>
  </footer>
</template>

<style scoped>
#footer {
  box-sizing: border-box;
  width: 100%;
  height: 370px;
  padding: 60px;
  display: flex;
  flex-direction: column;
  gap: 50px;
  font-weight: bolder;
  font-size: 14px;
  color: var(--third-font-color);
  background-color: var(--footer-color);
}

.site-map {
  display: flex;
  gap: 10px;
}

.copyright {
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 15px;
  font-weight: 400;
  color: var(--sub-font-color);
}

.info {
  font-size: 13px;
}
</style>
