<template>
  <div class="paper-css paper-css-container">
    <div id="single-post" v-html="post.html"></div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { getSinglePost } from '@/backend/db';
import { ref } from 'vue';

const post = ref<string | null>(null);

async function getPost() {
  try {
    if (isPostLoadedFromParams(useRoute().params.post)) {
      return JSON.parse(useRoute().params.post as string);
    }
    if (typeof useRoute().params.id === 'string') {
      return await getSinglePost(useRoute().params.id as string);
    }
  } catch (e) {
    console.error('Error while fetching single post', e);
  }

  return null;
}

function isPostLoadedFromParams(params: unknown): params is string {
  return typeof (params as string) === 'string';
}

post.value = await getPost();

</script>

<style scoped>
@import "../assets/paper-prototype.css";

#single-post#single-post {
  width: 100%;
}
</style>
