<script setup></script>

<template>
  <section id="section">
    <div class="upper">
      <div class="info">
        <img
          src="https://t1.kakaocdn.net/kakaocorp/kakaocorp/admin/6562f7bc017800001.png?type=thumb&opt=C72x72.fwebp"
          width="36"
          height="36"
        />
        <div class="state">인기 게시글</div>
        <span class="date">2023.11.09</span>
      </div>

      <h1 id="title">해동용궁사에서 용 만나다 용용죽겠지 용용선생가서 소주는 이제 7000원</h1>

      <ul id="tag">
        <li>#부산</li>
        <li>#용</li>
        <li>#절</li>
        <li>#108배</li>
      </ul>
    </div>

    <div class="lower"></div>
    <!-- <img src="" alt=""> -->
  </section>
</template>

<style scoped>
#section {
  box-sizing: border-box;
  width: 430px;
  height: 380px;
  display: flex;
  flex-direction: column;
  /* border: 1px solid #d6d9d7; */
  border-radius: 15px;
  background-color: var(--font-color);
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
  flex-basis: 70%;
  flex-grow: 4;
  background-color: var(--yellow-color);
  border-radius: 0 0 15px 15px;
}
</style>
