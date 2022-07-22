<template>
  <div id="single-post" class="paper-css paper-css-container">
    <div class="post-content" v-html="post.html"></div>

    <button @click="isOpen = true">Usuń</button>
    <div class="confirmation-overlay no-style" v-show="isOpen">
      <div class="confirmation">
        <h2>Na pewno chcesz usunąć kartkę?</h2>
        <button @click="handleDelete">Tak</button>
        <button @click="isOpen = false">Nie</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import { deleteSinglePost, getSinglePost } from '@/backend/db';
import { ref } from 'vue';

const post = ref<string | null>(null);
const isOpen = ref(false);

const route = useRoute();
const router = useRouter();

async function getPost() {
  try {
    if (isPostLoadedFromParams(route.params.post)) {
      return JSON.parse(route.params.post as string);
    }
    if (typeof route.params.id === 'string') {
      return await getSinglePost(route.params.id as string);
    }
  } catch (e) {
    console.error('Error while fetching single post', e);
  }

  return null;
}

async function handleDelete() {
  await deleteSinglePost(route.params.id as string);
  await router.push({ name: 'home' });
}

function isPostLoadedFromParams(params: unknown): params is string {
  return typeof (params as string) === 'string';
}

post.value = await getPost();

</script>

<style scoped lang="scss">
@import "../assets/paper-prototype.css";

#single-post#single-post {
  .post-content {
    width: 100%;
  }

  .confirmation-overlay {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.5);
    transform: none;
    position: fixed;
    top: 0;
    left: 0;

    .confirmation {
      background: navajowhite;
    }
  }
}
</style>
