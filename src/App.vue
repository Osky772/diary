<template>
  <div v-if="isUserLogged">
    <div class="paper-css paper-css-container">
      <nav class="no-style">
        <router-link to="/">Pamiętnik</router-link>
        <router-link to="/dodaj-kartke">Dodaj kartkę</router-link>
        <button @click.prevent="handleSignOut">Wyloguj się</button>
      </nav>
    </div>
    <router-view/>
  </div>

  <SignIn v-else @onLogged="handleOnLogged" />
</template>

<script lang="ts" setup>
import { getAuth, signOut } from 'firebase/auth';
import { ref } from 'vue';
import SignIn from './components/SignIn.vue';

const auth = getAuth();
const isUserLogged = ref(auth.currentUser ?? false);

function handleOnLogged(user: any) {
  isUserLogged.value = !!user.userCredential;
}

function handleSignOut() {
  signOut(auth);
  isUserLogged.value = false;
}

</script>

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
