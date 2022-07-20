<template>
  <div>
    <div class="paper-css add-cart">
      <h1>Dodaj kartkę z pamiętnika</h1>
    </div>

    <div>
      <ckeditor :editor="editor" v-model="editorData"></ckeditor>
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
import Editor from 'ckeditor5-custom-build/build/ckeditor';

const editor = Editor;
const editorData = '';

</script>

<script lang="ts">
// ONLY FOR INITIALIZING CKEDITOR COMPONENT
// @ts-ignore
import CKEditor from '@ckeditor/ckeditor5-vue';

export default {
  components: {
    ckeditor: CKEditor.component,
  },
};
</script>
