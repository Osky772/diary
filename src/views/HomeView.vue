<template>
  <div
    id="homeview"
    class="paper-css paper-css-container no-style posts-list"
  >
    <h1 v-if="isLoading">Ładuję kartki...</h1>
    <h1 v-if="isError" style="color: red;">Błąd ładowania :(</h1>

    <div
      :key="id"
      v-for="(post, id) in posts"
      v-html="post.html"
      class="post-list-item"
      @click="$emit('post-clicked', post)"
    >
    </div>

  </div>
</template>

<script lang="ts" setup>
import { useQuery } from 'vue-query';
import { getPosts } from '@/backend/db';

function usePostsQuery() {
  return useQuery('posts', getPosts);
}
const {
  isLoading, isError, data: posts,
} = usePostsQuery();

</script>

<style lang="scss" scoped>
@import '../assets/paper-prototype.css';

#homeview#homeview {
  .post-list-item {
    width: 100%;
    margin-bottom: 40px;
  }
}
</style>
