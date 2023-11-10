<script setup>
defineProps({
    firstimage: String,
    title: String,
    addr1: String,
    addr2: String,
    mapy: String,
    mapx: String
    })
</script>

<template>
    <tr>
        <td><img :src="firstimage" width="100"></td>
        <td>{{title}}</td>
        <td>{{addr1}} {{addr2}}</td>
        <td>{{mapy}}</td>
        <td>{{mapx}}</td>
    </tr>
</template>

<style scoped>

</style>