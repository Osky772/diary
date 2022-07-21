<template>
  <div>params: {{ $route.params.id }}</div>
  <div class="paper-css paper-css-container">
  </div>
  <div v-html="post"></div>
</template>

<script lang="ts" setup>

import { useRoute } from 'vue-router';

const post = JSON.parse(useRoute().params.post as string).html;
</script>

<style scoped>
@import "../assets/paper-prototype.css";
</style>
