<template>
  <div v-if="userState === AuthState.OnValidating">
    <div class="paper-css paper-css-container">
      <h1>Witam w pamiętniku</h1>
    </div>
  </div>

  <div v-if="userState === AuthState.LoggedIn">
    <div class="paper-css paper-css-container">
      <nav class="no-style">
        <router-link to="/">Pamiętnik</router-link>
        <router-link to="/dodaj-kartke">Dodaj kartkę</router-link>
        <button @click="handleSignOut">Wyloguj się</button>
      </nav>
    </div>

    <router-view :user="user"/>
  </div>

  <SignIn v-else-if="userState === AuthState.LoggedOut" @onLogged="handleSignIn" />
</template>

<script lang="ts" setup>
import {
  getAuth, signOut, User, updateProfile,
} from 'firebase/auth';
import { ref } from 'vue';
import { useQueryProvider } from 'vue-query';
import SignIn from './components/SignIn.vue';

useQueryProvider();

enum AuthState {
  OnValidating,
  LoggedOut,
  LoggedIn,
}

const auth = getAuth();
const userState = ref(AuthState.OnValidating);
const user = ref<User | null>(null);

auth.onAuthStateChanged((firebaseUser) => {
  if (firebaseUser) {
    userState.value = AuthState.LoggedIn;
    user.value = firebaseUser;

    // TODO: update user profile
    if (firebaseUser.email?.includes('oskar')) {
      updateProfile(firebaseUser, {
        displayName: 'Oskar',
      });
    } else {
      updateProfile(firebaseUser, {
        displayName: 'Zuzia',
      });
    }
  } else {
    userState.value = AuthState.LoggedOut;
    user.value = null;
  }
});

function handleSignIn(userCredential: any) {
  userState.value = userCredential.userCredential ? AuthState.LoggedIn : AuthState.LoggedOut;
}

async function handleSignOut() {
  console.log('handleSignOut');
  await signOut(auth);
  userState.value = AuthState.LoggedOut;
}

</script>

<style lang="scss">
nav {
  padding-bottom: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
