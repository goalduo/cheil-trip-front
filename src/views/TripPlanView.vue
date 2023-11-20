<script setup>
import NavHeader from '../components/NavHeader.vue'
import SiteMapFooter from '../components/SiteMapFooter.vue'
import TripPlan from '../components/tripplan/TripPlan.vue'
</script>

<template>
  <div>
    <NavHeader :is-main-page-header="false"></NavHeader>
    <TripPlan></TripPlan>
    <SiteMapFooter></SiteMapFooter>
  </div>
</template>

<style scoped></style>
