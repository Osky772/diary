<template>
  <div class="paper-css paper-css-container">
    <nav class="no-style">
      <router-link to="/">Pamiętnik</router-link>
      <router-link to="/dodaj-kartke">Dodaj kartkę</router-link>
    </nav>
  </div>
  <router-view/>
</template>

<style lang="scss">
nav {
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
