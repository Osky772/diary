<template>
  <div class="paper-css paper-css-container add-cart">
    <h1>Dodaj kartkę z pamiętnika</h1>
  </div>

  <div class="editor-container">
    <div class="editor no-style">
      <ckeditor :editor="editor" v-model="editorData"></ckeditor>
    </div>

    <div class="preview paper-css" v-html="editorData">
    </div>
  </div>
</template>

<script lang="ts">
// @ts-ignore
import CKEditor from '@ckeditor/ckeditor5-vue';
// @ts-ignore
import Editor from 'ckeditor5-custom-build/build/ckeditor';

export default {
  components: {
    ckeditor: CKEditor.component,
  },
  data() {
    return {
      editor: Editor,
      editorData: '',
    };
  },
};
</script>

<style lang="scss" scoped>
.editor-container {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;

  .editor {
    width: 99%;
  }
}
</style>
