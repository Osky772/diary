<template>
  <div class="paper-css paper-css-container  no-style">
    <div :key="id" v-for="(post, id) in posts" v-html="post.html">
    </div>

  </div>
</template>

<script lang="ts" setup>
import { getPosts } from '@/backend/db';

const posts = await getPosts();

</script>

<style lang="scss" scoped>
@import '../assets/paper-prototype.css';
</style>
