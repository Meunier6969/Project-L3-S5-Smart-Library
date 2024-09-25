<template>
  <!-- Conteneur principal pour la page de login avec la classe Bootstrap `d-flex` pour centrer le contenu -->
  <div class="login-page d-flex">

    <div class="card p-4 shadow-lg">
      <div class="card-body mb-4">
        <h3 class="card-title">Log In</h3>
        <form>
          <div class="form-group mb-3">
            <label for="email">Email</label>
            <input type="email" class="form-control" id="email" v-model="email">
          </div>

          <div class="form-group mb-3">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password" v-model="password">
          </div>

          <div class="d-grid mb-3">

            <button type="submit" class="btn btn-dark btn-block">Sign In</button>
          </div>

          <div class="text-center">
            <button @click="$emit('close')">Close</button>
            <button @click="$emit('switchToSignUp')">No account? Sign up</button>
          </div>

        </form>
      </div>
    </div>
  </div>

</template>


<script setup>

import { ref } from 'vue';

const email = ref('');
const password = ref('');
</script>

<style scoped>
.login-page {
  background-color: rgba(0, 0, 0, 0.1);
}
.card {
  background-color: white;
  backdrop-filter: blur(10px);
}
</style>
