<script setup>
const elements = defineProps({
  list: Array
})
</script>

<template>
  <ul id="ul">
    <li v-for="element in elements.list">
      {{ element }}
    </li>
  </ul>
</template>

<style scoped>
#ul {
  width: 150px;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

li:first-child {
  font-size: 16px;
  font-weight: 700;
}

li:not(:first-child) {
  cursor: pointer;
  font-size: 14px;
  font-weight: 400;
  color: var(--sub-font-color);
}
</style>
