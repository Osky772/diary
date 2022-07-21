<template>
  <div
   id="homeview"
    class="paper-css paper-css-container no-style posts-list"
  >
    <div
      :key="id"
      v-for="(post, id) in posts"
      v-html="post.html"
      class="post-list-item"
    >
    </div>

  </div>
</template>

<script lang="ts" setup>
import { getPosts } from '@/backend/db';

const posts = await getPosts();

</script>

<style lang="scss" scoped>
@import '../assets/paper-prototype.css';

#homeview#homeview {
  padding-top: 30px;

  .post-list-item {
    width: 100%;
    margin-bottom: 40px;
  }
}
</style>
