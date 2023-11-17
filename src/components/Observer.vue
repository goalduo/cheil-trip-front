<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const trigger = ref()
const options = {
    root: null,
    threshold: 1
}

const emit = defineEmits(['triggerIntersected'])

let observer;
const handleIntersect = (entry) => {
    if (entry.isIntersecting) emit('triggerIntersected', trigger.value)
}

onMounted(() => {
    try {
        observer = new IntersectionObserver((entries) => {
            handleIntersect(entries[0])
        }, options)
        observer.observe(trigger.value)
    } catch (error) {
        console.log(error)
    }
})

// onUnmounted(() => {
//     observer.value.disconnect()
// })
</script>

<template>
    <div ref="trigger"></div>
</template>

<style scoped></style>