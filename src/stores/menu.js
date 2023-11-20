import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useHeaderMenuStore = defineStore('headerMenuStore', () => {
  // const isAccessible = ref(true)

  const headerMenuList = ref([
    { name: '여행지 검색', routeName: '/attraction', show: true },
    { name: '여행카드 만들기', routeName: '/plan', show: true },
    { name: '게시판', routeName: '/post', show: true },
    { name: '게시물 작성하기', routeName: '/post/create', show: true },
    { name: '로그인', routeName: '/login', show: true },
    // 마이페이지 잠시 개발중에만 true로 바꿔 놓음
    { name: '마이페이지', routeName: '/my', show: true },
    { name: '로그아웃', routeName: '/', show: false, event: 'click' }
  ])

  const changeHeaderMenuState = () => {
    headerMenuList.value = headerMenuList.value.map((item) => {
      if (item.name === '로그인' || item.name === '마이페이지' || item.name === '로그아웃') {
        return { ...item, show: !item.show }
      } else {
        return { ...item }
      }
    })
  }

  return {
    headerMenuList,
    changeHeaderMenuState
  }
})
