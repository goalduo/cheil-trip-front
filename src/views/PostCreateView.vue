<script setup>
import Editor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import SitemapFooter from '../components/SitemapFooter.vue'

import { onMounted, ref } from 'vue'

onMounted(() => {
  const editor = new Editor({
    el: document.querySelector('#editor'),
    width: '500px',
    height: '600px',
    initialEditType: 'wysiwyg',
    previewStyle: 'vertical',
    placeholder:
      '- 위치 정보를 자세히 알려주시면 더 좋아요!\n- 마크다운으로도 작성할 수 있어요.\n- 여행과 관련된 정보들을 많이 알려주세요!',
    toolbarItems: [
      ['heading', 'bold', 'italic', 'strike'],
      ['hr', 'quote'],
      ['ul', 'ol', 'task', 'indent', 'outdent'],
      ['table', 'link'],
      ['code', 'codeblock'],
      ['scrollSync']
    ]
  })
})

const categoryState = ref([false, false, false, false])

const onClickCategory = (num) => {
  categoryState.value.map((value, index) => {
    if (index === num) categoryState.value[index] = true
    else categoryState.value[index] = false
  })
}
</script>

<template>
  <div id="wrap">
    <h1 class="title">게시글 작성</h1>

    <div class="category-input">
      <p>카테고리</p>
      <ul>
        <li>
          <button @click="onClickCategory(0)" :class="{ 'category-selected': categoryState[0] }">
            여행지
          </button>
        </li>
        <li>
          <button @click="onClickCategory(1)" :class="{ 'category-selected': categoryState[1] }">
            맛집
          </button>
        </li>
        <li>
          <button @click="onClickCategory(2)" :class="{ 'category-selected': categoryState[2] }">
            코스
          </button>
        </li>
        <li>
          <button @click="onClickCategory(3)" :class="{ 'category-selected': categoryState[3] }">
            기타
          </button>
        </li>
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

    <div class="editor-input">
      <p>내용</p>
      <!-- TOAST UI 위치 -->
      <div id="editor"></div>
    </div>

    <div class="submit">
      <button class="cancel">취소</button>
      <button class="confirm">확인</button>
    </div>
  </div>

  <SitemapFooter></SitemapFooter>
</template>

<style scoped>
#wrap {
  position: relative;
  width: 100%;
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
.editor-input {
  margin: 15px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.category-input p,
.title-input p,
.tag-input p,
.editor-input p {
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

.category-input ul li .category-selected {
  color: var(--sky-color);
  border-color: var(--sky-color);
}

.title-input input {
  width: 600px;
  padding: 20px;
  font-size: 16px;
  border: 1px solid var(--tag-color);
  border-radius: 4px;
  outline-color: var(--sky-color);
}

.tag-input input {
  width: 600px;
  padding: 20px;
  font-size: 16px;
  border: 1px solid var(--tag-color);
  border-radius: 4px;
  outline-color: var(--sky-color);
}

.tag-input span {
  font-size: 14px;
  color: var(--sub-font-color);
}

.submit {
  margin: 20px 0;
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

.cancel:hover,
.confirm:hover {
  border-color: var(--fourth-font-color);
}

#editor {
  width: 1000px;
}
</style>
