<template>
  <div class="paper-css home no-style-wrapper">
    <h1>Dzisiaj było super</h1>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeView',
  components: {
  },
});
</script>

<style lang="scss" scoped>
@import '../assets/paper-prototype.css';
.home {
  width: 700px;
  margin: 0 auto;
}
</style>
