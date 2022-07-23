<template>
  <div class="paper-css paper-css-container add-cart">
    <h1>Dodaj kartkę z pamiętnika</h1>
  </div>

  <div class="editor-container">
    <div class="editor no-style">
      <ckeditor
        :editor="editor"
        v-model="editorData"
        :config="editorConfig"
      ></ckeditor>
    </div>

    <div class="preview paper-css">
      <div v-html="editorData"></div>
    </div>
  </div>

  <div class="send-btn-wrapper paper-css paper-css-container">
    <button @click="isSendModalOpen = true">
      {{ isLoading ? 'Leci...' : 'Wyślij kartkę'}}
    </button>
    <button @click="isClearModalOpen = true">Wymaż wszystko</button>

    <div class="confirmation-overlay no-style" v-show="isSendModalOpen">
      <div class="confirmation">
        <h2>Na pewno chcesz wysłać kartkę?</h2>
        <button @click="handleSendPost">Tak</button>
        <button @click="isSendModalOpen = false">Nie</button>
      </div>
    </div>

    <div class="confirmation-overlay no-style" v-show="isClearModalOpen">
      <div class="confirmation">
        <h2>Na pewno chcesz wszystko wymazać?</h2>
        <button @click="handleClear">Tak</button>
        <button @click="isClearModalOpen = false">Nie</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// @ts-ignore
import CKEditor from '@ckeditor/ckeditor5-vue';
// @ts-ignore
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { addPost, updatePost } from '@/backend/db';
import { PropType, ref, watch } from 'vue';
import { User } from 'firebase/auth';
import { useRoute, useRouter } from 'vue-router';
import { MyCustomUploadAdapterPlugin } from '@/views/EditSinglePost.helpers';

interface Props {
  user: User | null;
}

export default {
  props: {
    user: {
      type: Object as PropType<User>,
      required: true,
    },
  },
  components: {
    ckeditor: CKEditor.component,
  },
  setup(props: Props) {
    const editor = Editor;
    const editorData = ref(localStorage.getItem('editorData') || '');
    const editorConfig = {
      extraPlugins: [MyCustomUploadAdapterPlugin],
    };
    const isLoading = ref(false);
    const router = useRouter();
    const route = useRoute();
    const isSendModalOpen = ref(false);
    const isClearModalOpen = ref(false);

    watch(editorData, (newValue) => {
      localStorage.setItem('editorData', newValue);
    });

    async function handleSendPost() {
      isSendModalOpen.value = false;
      isLoading.value = true;

      try {
        console.log('route.params.isEdit', route.params.isEdit);
        if (route.params.isEdit) {
          await handleUpdatePost();
        } else {
          await createNewPost();
        }

        localStorage.removeItem('editorData');
      } catch (e: any) {
        window.alert(`Coś poszło nie tak. ${e.message}`);
      }
    }

    async function handleUpdatePost() {
      const post = {
        ...JSON.parse(route.params.post as string),
        html: editorData.value,
      };

      await updatePost({
        id: post.id,
        html: post.html,
      });
      isLoading.value = false;

      await router.push({
        name: 'kartka',
        params: {
          id: post.id,
          post: JSON.stringify(post),
        },
      });
    }

    async function createNewPost() {
      const post = await addPost({
        html: editorData.value,
        name: props.user?.displayName ?? '',
        createdAt: new Date().toString(),
      });
      isLoading.value = false;

      if (post) {
        await router.push({
          name: 'kartka',
          params: {
            id: post.id,
            post: JSON.stringify(post),
          },
        });
      }
    }

    function handleClear() {
      isClearModalOpen.value = false;
      editorData.value = '';
      localStorage.removeItem('editorData');
    }

    return {
      editor,
      editorData,
      editorConfig,
      handleSendPost,
      isLoading,
      handleClear,
      isSendModalOpen,
      isClearModalOpen,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/paper-prototype.css";

.add-cart {
  padding-bottom: 30px;
}

.editor-container {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;

  .editor {
    width: 99%;
  }
}

@media (max-width: 700px) {
  .editor-container {
    display: block;
  }
}
</style>
