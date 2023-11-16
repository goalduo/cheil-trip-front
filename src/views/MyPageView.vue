<script setup>
import NavHeader from '../components/NavHeader.vue'
import SitemapFooter from '../components/SitemapFooter.vue'

const tripPlans = {
  0: { id: 1, title: '복지리가 땡기는 지리산 여행', tags: ['복지리', '복어', '지리산', '등산'] },
  1: {
    id: 2,
    title: '암벽등반은 싫지만 그래도 가는 북한산',
    tags: ['등산', '끝나고', '술', '두잔']
  },
  2: {
    id: 3,
    title: '대방어를 먹기 위한 군산 여행',
    tags: ['대방어', '기름져', '광어도', '필요해']
  },
  3: { id: 4, title: '콜라 공장 방문', tags: ['제로', '콜라', '대세'] },
  4: { id: 5, title: '복지리가 땡기는 지리산 여행', tags: ['복지리', '복어', '지리산', '등산'] }
}
</script>

<template>
  <div id="wrap">
    <div id="my">
      <div id="my-info">
        <p>장수민</p>

        <span class="post-count">게시글</span>
        <span class="count">2</span>
        <span class="course-count">여행 경로</span>
        <span class="count">8</span>
      </div>

      <div id="my-activity">
        <!-- 내 활동 기록에 들어갈만 한 건 여행 경로, 작성한 게시글 -->
        <div class="my-post">
          <p>게시물</p>

          <ul class="post-list">
            <li v-for="i in 4">
              <section id="section">
                <div class="upper">
                  <div class="info">
                    <img
                      src="https://t1.kakaocdn.net/kakaocorp/kakaocorp/admin/6562f7bc017800001.png?type=thumb&opt=C72x72.fwebp"
                      width="36"
                      height="36"
                    />
                    <div class="state">인기 게시글</div>
                    <span class="date">방금 전</span>
                  </div>

                  <h1 id="title">해동용궁사에서 용을 보다</h1>

                  <ul id="tag">
                    <li>#부산</li>
                    <li>#용</li>
                    <li>#절</li>
                    <li>#108배</li>
                  </ul>
                </div>

                <div class="lower">
                  내용 : 아니 글쎄, 해동 용궁사에서 용을 봤어요 <br />
                  작성자 : 장수민, 조회수 : 150
                </div>
                <!-- <img src="" alt=""> -->
              </section>
            </li>
          </ul>
        </div>

        <div class="my-trip-course">
          <p>여행 경로</p>

          <ul class="trip-course-list">
            <li v-for="tripPlan in tripPlans">
              <div id="plan">
                <div class="info">
                  <img
                    src="https://t1.kakaocdn.net/kakaocorp/kakaocorp/admin/category/1cf6a77b018800001.png?type=thumb&amp;opt=C72x72.fwebp"
                    width="36"
                    height="36"
                  />
                  <div class="state">여행 경로 저장</div>
                </div>

                <h1 id="title">{{ tripPlan.title }}</h1>

                <ul id="tag">
                  <li v-for="tag in tripPlan.tags">#{{ tag }}</li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#wrap {
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
  width: 20%;
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
  width: 80%;
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

#section {
  box-sizing: border-box;
  width: 430px;
  height: 380px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  /* border: 1px solid #d6d9d7; */
  border-radius: 15px;
  background-color: var(--font-color);
  box-shadow: 4px 12px 30px 6px var(--shadow-color);
}

.upper {
  flex-basis: 30%;
  flex-grow: 1;
  padding: 20px;
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
  font-size: 25px;
  color: var(--fourth-font-color);
}

#tag {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  gap: 5px;
  font-size: 14px;
  line-height: 19px;
  color: var(--tag-font-color);
}

.lower {
  padding: 20px;
  flex-basis: 70%;
  flex-grow: 4;
  background-color: var(--sky-color);
  border-radius: 0 0 15px 15px;
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
  width: 250px;
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
