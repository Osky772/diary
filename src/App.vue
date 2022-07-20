<template>
  <div id="c-app">
    <nav class="no-style-wrapper">
      <router-link to="/">Pamiętnik</router-link>
      <router-link to="/dodaj-kartke">Dodaj kartkę</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<style lang="scss">
#c-app#c-app {
  width: 700px;
  margin: 0 auto;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
