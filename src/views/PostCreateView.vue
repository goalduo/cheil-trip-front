<script setup></script>

<template>
  <div id="wrap">
    <h1 class="title">게시글 작성</h1>

    <div class="category-input">
      <p>카테고리</p>
      <ul>
        <li><button>여행지</button></li>
        <li><button>맛집</button></li>
        <li><button>코스</button></li>
        <li><button>기타</button></li>
      </ul>
    </div>

    <div class="title-input">
      <p>제목</p>
      <input type="text" placeholder="제목을 적어주세요." />
    </div>

    <div class="tag-input">
      <p>태그</p>
      <input type="text" placeholder="태그를 추가해보세요!" />
      <span>최대 5개의 태그를 달 수 있어요!</span>
    </div>

    <div class="editor">
      <p>내용</p>
      <!-- TOAST UI 위치 -->
    </div>

    <div class="submit">
      <button class="cancel">취소</button>
      <button class="confirm">확인</button>
    </div>
  </div>
</template>

<style scoped>
#wrap {
  position: relative;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  padding: 25px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: var(--fourth-font-color);
  background-color: var(--font-color);
}

.title {
  margin: 20px 0;
  font-size: 24px;
  font-weight: 600;
}

.category-input,
.title-input,
.tag-input,
.editor {
  margin: 15px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.category-input p,
.title-input p,
.tag-input p,
.editor p {
  font-size: 16px;
  font-weight: 500;
  color: var(--sub-font-color);
}

.category-input ul {
  display: flex;
  gap: 10px;
}

.category-input ul li button,
.cancel {
  cursor: pointer;
  width: 80px;
  height: 50px;
  font-size: 16px;
  background-color: var(--font-color);
  border: 1px solid var(--tag-color);
  border-radius: 4px;
}

.category-input ul li button:hover {
  color: var(--sky-color);
  border-color: var(--sky-color);
}

.title-input input {
  width: 600px;
  padding: 20px;
  font-size: 16px;
  border: 1px solid var(--tag-color);
  border-radius: 4px;
}

.tag-input input {
  width: 600px;
  padding: 20px;
  font-size: 16px;
  border: 1px solid var(--tag-color);
  border-radius: 4px;
}

.tag-input span {
  font-size: 14px;
  color: var(--sub-font-color);
}

.submit {
  display: flex;
  gap: 10px;
}

.confirm {
  cursor: pointer;
  width: 80px;
  height: 50px;
  font-size: 16px;
  border: 1px solid var(--tag-color);
  border-radius: 4px;
}
</style>
