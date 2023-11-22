<script setup>
import NavHeader from '../components/NavHeader.vue'
import SitemapFooter from '../components/SitemapFooter.vue'
import PostCard from '../components/post/PostCard.vue'
import TripPlanElement from '@/components/tripplan/TripPlanElement.vue'

import { ref, onMounted } from 'vue'
import { listArticle, listArticleByUserId, getArticleCountByUserId } from '@/api/BoardAPI.js'
import { getTripplansAndTripCoursesByUserId } from '@/api/TripplanAPI.js'
import { storeToRefs } from 'pinia'
import Observer from '@/components/Observer.vue'
import { useMemberStore } from "@/stores/member";
const memberStore = useMemberStore();
const { userInfo } = storeToRefs(memberStore)
const articleCount = ref(0);
const tripPlans = ref([]);

onMounted(async () => {
  console.log(userInfo.value)
  articleCount.value = await getArticleCountByUserId(userInfo.value.userId);
  const result = await getTripplansAndTripCoursesByUserId(userInfo.value.userId);
  result.forEach(tripPlan => {
    tripPlan.hashtags = tripPlan.hashtags?.split('-')
    tripPlans.value.push(tripPlan)
  })
})
// 게시물을 가져오기
const articles = ref([]);
const page = ref(0)
const loadMore = async () => {
  await listArticleByUserId(
    { pgno: page.value + 1 },
    userInfo.value.userId,
    (response) => {
      response.data.forEach(element => {
        if (element.hashtags !== null) {
          element.hashtags = element.hashtags.split("-")
        }
      });
      articles.value.push(...response.data)
      console.log(articles.value)
    },
    (error) => {
      console.log(error)
    }
  )
  page.value += 1
}

</script>

<template>
  <NavHeader :is-main-page-header="false"></NavHeader>
  <div id="wrap">
    <div id="my">
      <div id="my-info">
        <p>{{userInfo.userName}}</p>

        <span class="post-count">게시글</span>
        <span class="count">{{ articleCount }}</span>
        <span class="course-count">여행 경로</span>
        <span class="count">{{tripPlans.length}}</span>
      </div>

      <div id="my-activity">
        <!-- 내 활동 기록에 들어갈만 한 건 여행 경로, 작성한 게시글 -->
        <div class="my-post">
          <p>게시물</p>

          <div class="post-list">
            <PostCard v-for="article in articles" :key="article.id" v-bind="article"></PostCard>
            <Observer @triggerIntersected="loadMore"/>
          </div>
        </div>

        <div class="my-trip-course">
          <p>여행 경로</p>
          
          <div class="trip-course-list">
            <TripPlanElement
              v-for="tripPlan in tripPlans"
              :key="tripPlan.planId"
              :tripPlan="tripPlan"
            ></TripPlanElement>
          </div>
        </div>
      </div>
    </div>
  </div>
  <SitemapFooter></SitemapFooter>
</template>

<style scoped>
#wrap {
  box-sizing: border-box;
  min-width: 1000px;
  width: 100%;
  min-height: 100vh;
  padding: 20px;
  display: flex;
  gap: 20px;
  color: var(--fourth-font-color);
  background-color: var(--font-color);
}

/* wrap이 전체 페이지라면, my는 내 정보에 관련된 부분 */
#my {
  width: 100%;
  display: flex;
}

#my-info {
  box-sizing: border-box;
  min-width: 210px;
  padding: 30px;
  border-right: 2px solid var(--tag-color);
}

#my-info p {
  margin: 10px 0;
  font-size: 25px;
  font-weight: 600;
}

.post-count,
.course-count {
  margin-right: 5px;
  font-size: 15px;
  font-weight: 200;
}

.count {
  margin-right: 10px;
  font-size: 15px;
  font-weight: 600;
}

#my-activity {
  min-width: 80%;
  display: flex;
  flex-direction: column;
}

.my-post {
  margin: 0 20px;
  padding: 30px 0 30px 30px;
  border-bottom: 2px solid var(--tag-color);
}
.post-list {
  padding: 50px 30px;
  display: flex;
  gap: 20px;
  overflow-x: scroll;
}
.my-trip-course {
  margin: 0 20px;
  padding: 30px 0 30px 30px;
}

.my-post p,
.my-trip-course p {
  margin: 10px 0;
  font-size: 20px;
  font-weight: 600;
}

.trip-course-list {
  padding: 50px 30px;
  display: flex;
  gap: 20px;
  overflow-x: scroll;
}

#plan {
  cursor: pointer;
  box-sizing: border-box;
  width: 300px;
  height: 200px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 15px;
  background-color: var(--font-color);
  box-shadow: 4px 12px 30px 6px var(--shadow-color);
}

.info {
  display: flex;
  align-items: center;
  gap: 10px;
}
.state {
  padding: 5px 10px;
  font-size: 13px;
  line-height: 20px;
  color: var(--tag-font-color);
  border-radius: 10px;
  background-color: var(--tag-color);
}
.date {
  font-size: 11px;
  line-height: 20px;
  color: var(--tag-font-color);
}

#title {
  margin: 10px 0;
  font-weight: 500;
  font-size: 20px;
  word-break: keep-all;
  color: var(--fourth-font-color);
}

#tag {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  gap: 5px;
  font-size: 14px;
  font-weight: 200;
  line-height: 19px;
  color: var(--tag-font-color);
}
</style>
