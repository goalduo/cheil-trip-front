<script setup>
import NavHeader from '../components/NavHeader.vue'
import SitemapFooter from '../components/SitemapFooter.vue';
import AttractionList from '../components/attraction/Attractionlist.vue'
import AttractionListTest from "../components/attraction/AttractionListTest.vue";
import test from "../components/attraction/test.vue";
</script>

<template>
    <div>
        <NavHeader :is-main-page-header="false"></NavHeader>
        <!-- <test></test> -->
        <attraction-list></attraction-list>
        <!-- <attraction-list-test></attraction-list-test> -->
        <SitemapFooter></SitemapFooter>
    </div>
</template>

<style scoped>

</style>