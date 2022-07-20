<template>
  <div id="sign-in" class="paper-css paper-css-container">
    <h1>Zaloguj się</h1>

    <form @submit.prevent="handleSubmit">
      <label for="email" class="no-style">
        <input type="text" name="email" v-model="email" placeholder="Email">
      </label>
      <label for="pass" class="no-style">
        <input type="password" name="pass" v-model="password" placeholder="Password">
      </label>
      <button>Zaloguj</button>
    </form>

    <h3 v-if="invalid" class="invalid">Nieprawidłowe dane</h3>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '@/backend/init';

const email = ref('');
const password = ref('');
const invalid = ref(false);
// eslint-disable-next-line no-undef
const emit = defineEmits(['onLogged']);

const auth = getAuth(app);

function handleSubmit() {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // const { user } = userCredential;
      emit('onLogged', { userCredential });
      invalid.value = false;
    })
    .catch((error) => {
      console.log('sign in error', error);
      invalid.value = true;
    });
}

</script>

<style lang="scss" scoped>
#sign-in#sign-in {
  .invalid {
    color: red;
  }
}
</style>
