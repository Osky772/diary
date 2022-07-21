<template>
  <div v-if="isUserLogged">
    <div class="paper-css paper-css-container">
      <nav class="no-style">
        <router-link to="/">Pamiętnik</router-link>
        <router-link to="/dodaj-kartke">Dodaj kartkę</router-link>
        <button @click.prevent="handleSignOut">Wyloguj się</button>
      </nav>
    </div>

    <Suspense>
      <router-view
        :user="user"
        @postClicked="handlePostClicked"
      />

      <template #fallback>Loading...</template>
    </Suspense>
  </div>

  <SignIn v-else @onLogged="handleOnLogged" />
</template>

<script lang="ts" setup>
import {
  getAuth, signOut, User, updateProfile,
} from 'firebase/auth';
import { ref } from 'vue';
import { useQueryProvider } from 'vue-query';
import { useRouter } from 'vue-router';
import SignIn from './components/SignIn.vue';

const router = useRouter();

useQueryProvider();

const auth = getAuth();
const isUserLogged = ref(false);
const user = ref<User | null>(null);

auth.onAuthStateChanged((firebaseUser) => {
  if (firebaseUser) {
    isUserLogged.value = true;
    user.value = firebaseUser;

    // TODO: update user profile
    // updateProfile(firebaseUser, {
    //   displayName: '',
    // });
  }
});

function handleOnLogged(userCredential: any) {
  isUserLogged.value = !!userCredential.userCredential;
}

function handlePostClicked(post: any) {
  console.log(post);
  router.push({
    name: 'kartka',
    params: {
      id: post.id,
      post: JSON.stringify(post),
    },
  });
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
