<script setup>
import { useRouter } from 'vue-router'
import Editor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import NavHeader from '../components/NavHeader.vue'
import SitemapFooter from '../components/SitemapFooter.vue'

import { onMounted, ref, watch } from 'vue'
import { uploadImage, registArticle } from '@/api/BoardAPI.js'
import { useMemberStore } from '@/stores/member'
const memberStore = useMemberStore()
const { userInfo } = memberStore

const { VITE_VUE_API_URL } = import.meta.env
const router = useRouter()
let editor
onMounted(() => {
  console.log(userInfo)
  editor = new Editor({
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
      ['table', 'image', 'link'],
      ['code', 'codeblock'],
      ['scrollSync']
    ],
    hooks: {
      async addImageBlobHook(blob, callback) {
        console.log(blob)
        const formData = new FormData()
        formData.append('image', blob)
        uploadImage(formData, (response) => {
          console.log(response)
          const { saveFolder, originalFile, saveFile } = response.data
          console.log('서버에 저장된 파일명 : ', saveFile)
          console.log('원본 파일명 : ', originalFile)
          const imageUrl = `${VITE_VUE_API_URL}/board/image-print?savedFolder=${saveFolder}&filename=${saveFile}`
          callback(imageUrl, 'image alt attribute')
        })
      }
    }
  })
})

const categoryState = ref([false, false, false, false])
const categoryList = ['여행지', '맛집', '코스', '기타']
const title = ref('')
const categorySelected = ref('')
const onClickCategory = (num) => {
  categorySelected.value = categoryList[num]
  categoryState.value.map((value, index) => {
    if (index === num) categoryState.value[index] = true
    else categoryState.value[index] = false
  })
}
function cancelPost() {
  let confirm = confirm('작성중인 게시글이 있습니다. 떠나시겠습니까?')
  if (confirm) router.push('/')
  return
}
function savePost() {
  const article = {
    subject: title.value,
    userId: 'ssafy',
    category: categorySelected.value,
    content: editor.getHTML()
  }
  if (editor.getMarkdown().length < 1) {
    alert('에디터 내용을 입력해 주세요.')
    throw new Error('editor content is required!')
  }
  registArticle(
    article,
    (response) => {
      console.log(response)
    },
    (error) => {
      console.log(error)
    }
  )
}

const tags = ref([])
const tag = ref('')
const isInputAvailable = ref(true)

const onChangeTagInputValue = (event) => {
  tag.value = event.target.value
  // console.log(tag.value)
}

const addTag = (event) => {
  if (tag.value.length > 0 && tags.value.length < 5) {
    tags.value.push(tag.value.trim())
    tag.value = ''
  }
  if (tags.value.length === 5) isInputAvailable.value = false
}

const removeTag = (index) => {
  tags.value.splice(index, 1)
  if (tags.value.length < 5) isInputAvailable.value = true
}
</script>

<template>
  <NavHeader :is-main-page-header="false"></NavHeader>
  
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
      <input type="text" placeholder="제목을 적어주세요." v-model="title" />
    </div>

    <div class="tag-wrap">
      <p>태그</p>
      <div class="tag-input">
        <div v-for="(tag, index) in tags" :key="index" class="tagging">
          {{ tag }}
          <span @click="removeTag(index)">x</span>
        </div>
        <input
          v-show="isInputAvailable"
          :value="tag"
          @input="onChangeTagInputValue"
          @keypress.enter.prevent="addTag"
          type="text"
          placeholder="태그를 추가해보세요!"
          class="tag-text"
        />
      </div>
      <span>최대 5개의 태그를 달 수 있어요!</span>
    </div>

    <div class="editor-input">
      <p>내용</p>
      <!-- TOAST UI 위치 -->
      <div id="editor"></div>
    </div>

    <div class="submit">
      <button class="cancel" @click="cancelPost">취소</button>
      <button class="confirm" @click="savePost">확인</button>
    </div>
  </div>

  <SitemapFooter></SitemapFooter>
</template>

<style scoped>
.tag-input {
  box-sizing: border-box;
  width: 800px;
  height: 60px;
  padding: 15px;
  display: flex;
  gap: 10px;
  font-size: 16px;
  font-weight: 600;
  border: 1px solid var(--tag-color);
  border-radius: 4px;
  outline-color: var(--sky-color);
  overflow: hidden;
}

.tag-input span {
  cursor: pointer;
  opacity: 0.75;
}

.tagging {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px;
  background-color: var(--tag-color);
  border-radius: 5px;
}

.tag-text {
  font-size: 16px;
  border: none;
  outline: none;
}

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
.tag-wrap,
.editor-input {
  margin: 15px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.category-input p,
.title-input p,
.tag-wrap p,
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
  width: 800px;
  height: 60px;
  padding: 20px;
  font-size: 16px;
  border: 1px solid var(--tag-color);
  border-radius: 4px;
  outline: none;
}

/* .tag-wrap input {
  width: 600px;
  padding: 20px;
  font-size: 16px;
  border: 1px solid var(--tag-color);
  border-radius: 4px;
  outline-color: var(--sky-color);
} */

.tag-wrap span {
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
