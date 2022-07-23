<template>
  <div id="single-post" class="paper-css paper-css-container">
    <template v-if="post">
      <div class="post-content">
        <p>
          Dodane przez: {{ post.name }}
          <br>
          Dnia: {{ formatDate(post.createdAt) }}
        </p>
        <div class="no-style" v-html="post.html"></div>
      </div>

      <button @click="handleEdit">Edytuj</button>
      <div class="confirmation-overlay no-style" v-show="isEditModalOpen">
        <div class="confirmation">
          <h2>
            Na pewno chcesz edytować kartkę?
            <br>
            Utracisz obecny stan edytora
          </h2>
          <button @click="editCurrentPost">Tak</button>
          <button @click="isEditModalOpen = false">Nie</button>
        </div>
      </div>

      <button @click="isDeleteModalOpen = true">Usuń</button>
      <div class="confirmation-overlay no-style" v-show="isDeleteModalOpen">
        <div class="confirmation">
          <h2>Na pewno chcesz usunąć kartkę?</h2>
          <button @click="handleDelete">Tak</button>
          <button @click="isDeleteModalOpen = false">Nie</button>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import { deleteSinglePost, getSinglePost, PostEntry } from '@/backend/db';
import { onMounted, ref } from 'vue';
import dayjs from 'dayjs';
import 'dayjs/locale/pl';

dayjs.locale('pl');

const post = ref<PostEntry | null>(null);
const isDeleteModalOpen = ref(false);
const isEditModalOpen = ref(false);

const route = useRoute();
const router = useRouter();

function formatDate(date: string) {
  return dayjs(date).format('DD MMM YYYY HH:mm');
}

async function getPost(): Promise<PostEntry | null> {
  try {
    if (isPostLoadedFromParams(route.params.post)) {
      return JSON.parse(route.params.post as string);
    }
    if (typeof route.params.id === 'string') {
      return await getSinglePost(route.params.id as string);
    }
  } catch (e) {
    window.alert(`Error while fetching single post ${e}`);
    console.error(e);
  }

  return null;
}

async function handleDelete() {
  try {
    await deleteSinglePost(route.params.id as string);
    await router.push({ name: 'home' });
  } catch (e: any) {
    window.alert(`Error while deleting post: ${e?.toString()}`);
  }
}

function handleEdit() {
  if (localStorage.getItem('editorData')) {
    isEditModalOpen.value = true;
  } else {
    editCurrentPost();
  }
}

function editCurrentPost() {
  if (post.value) {
    localStorage.setItem('editorData', post.value.html);
    isEditModalOpen.value = false;
    router.push({ name: 'add-post', params: { id: route.params.id } });
  }
}

function isPostLoadedFromParams(params: unknown): params is string {
  return typeof (params as string) === 'string';
}

onMounted(async () => {
  post.value = await getPost();
});

</script>

<style scoped lang="scss">
@import "../assets/paper-prototype.css";
@import "../assets/styles";

#single-post#single-post {
  .post-content {
    width: 100%;
  }
}
</style>
