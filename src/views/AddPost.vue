<template>
  <div class="paper-css paper-css-container add-cart">
    <h1>Dodaj kartkę z pamiętnika</h1>
  </div>

  <div class="editor-container">
    <div class="editor no-style">
      <ckeditor :editor="editor" v-model="editorData"></ckeditor>
    </div>

    <div class="preview paper-css">
      <div v-html="editorData"></div>
    </div>
  </div>

  <div class="send-btn-wrapper paper-css paper-css-container">
    <button @click="handleSendPost">
      {{ isLoading ? 'Leci...' : 'Wyślij kartkę'}}
    </button>
  </div>
</template>

<script lang="ts" setup>

</script>

<script lang="ts">
// @ts-ignore
import CKEditor from '@ckeditor/ckeditor5-vue';
// @ts-ignore
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { addPost } from '@/backend/db';
import { PropType, ref } from 'vue';
import { User } from 'firebase/auth';
import { useRouter } from 'vue-router';

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
    const editorData = ref('');
    const isLoading = ref(false);
    const router = useRouter();

    async function handleSendPost() {
      isLoading.value = true;
      const post = await addPost({
        html: editorData.value,
        name: props.user?.displayName ?? '',
        createdAt: new Date(),
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

    return {
      editor,
      editorData,
      handleSendPost,
      isLoading,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/paper-prototype.css";

.editor-container {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;

  .editor {
    width: 99%;
  }
}
</style>
