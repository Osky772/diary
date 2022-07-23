<template>
  <div v-if="AuthState.OnValidating">
    <div class="paper-css paper-css-container">
      <h1>Witam w pamiętniku</h1>
    </div>
  </div>

  <div v-else-if="AuthState.LoggedIn">
    <div class="paper-css paper-css-container">
      <nav class="no-style">
        <router-link to="/">Pamiętnik</router-link>
        <router-link to="/dodaj-kartke">Dodaj kartkę</router-link>
        <button @click.prevent="handleSignOut">Wyloguj się</button>
      </nav>
    </div>

<!--    <Suspense>-->
    <router-view :user="user"/>

<!--      <template #fallback>-->
<!--        <div class="paper-css paper-css-container">-->
<!--          <h1>Ładuję kartkę...</h1>-->
<!--        </div>-->
<!--      </template>-->
<!--    </Suspense>-->
  </div>

  <SignIn v-else-if="AuthState.LoggedOut" @onLogged="handleSignIn" />
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
const isUserLogged = ref(AuthState.OnValidating);
const user = ref<User | null>(null);

auth.onAuthStateChanged((firebaseUser) => {
  if (firebaseUser) {
    isUserLogged.value = AuthState.LoggedIn;
    user.value = firebaseUser;

    // TODO: update user profile
    // updateProfile(firebaseUser, {
    //   displayName: '',
    // });
  }
});

function handleSignIn(userCredential: any) {
  isUserLogged.value = userCredential.userCredential ? AuthState.LoggedIn : AuthState.LoggedOut;
}

function handleSignOut() {
  signOut(auth);
  isUserLogged.value = AuthState.LoggedOut;
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
