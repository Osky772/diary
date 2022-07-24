<template>
  <div
    id="homeview"
    class="paper-css paper-css-container no-style posts-list"
  >
    <h1 v-if="isLoading">Ładuję kartki...</h1>
    <h1 v-if="isError" style="color: red;">Błąd ładowania :(</h1>

    <div
      :key="post.createdAt + post.html"
      v-for="(post) in sortedPosts"
      v-html="post.html"
      class="post-list-item"
      @click="handlePostClick(post)"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { useQuery } from 'vue-query';
import { getPosts, PostEntry } from '@/backend/db';
import { useRouter } from 'vue-router';
import dayjs from 'dayjs';
import { computed, ref, watch } from 'vue';

const router = useRouter();

defineEmits(['post-clicked']);

function usePostsQuery() {
  return useQuery('posts', getPosts);
}
const {
  isLoading, isError, data: posts,
} = usePostsQuery();

const sortedPosts = computed(() => {
  const copy = [...posts.value ?? []];
  return copy?.sort((a, b) => dayjs(b.createdAt).diff(dayjs(a.createdAt)));
});

function handlePostClick(post: PostEntry) {
  router.push({
    name: 'kartka',
    params: {
      id: post.id,
      post: JSON.stringify(post),
    },
  });
}

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
