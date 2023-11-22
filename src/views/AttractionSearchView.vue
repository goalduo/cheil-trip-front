<script setup>
import NavHeader from '../components/NavHeader.vue'
import SitemapFooter from '../components/SitemapFooter.vue';
import AttractionList from '../components/attraction/Attractionlist.vue'
</script>

<template>
    <div>
        <NavHeader :is-main-page-header="false"></NavHeader>
        <attraction-list></attraction-list>
        <SitemapFooter></SitemapFooter>
    </div>
</template>

<style scoped>

</style>