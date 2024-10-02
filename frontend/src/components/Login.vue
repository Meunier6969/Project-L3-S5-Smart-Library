<template>
  <div class="modal fade" id="modalLogin" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Log In</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit="onSubmit">
            <div class="form-group mb-3">
              <label for="emailLogIn">Email</label>
              <input type="email" class="form-control" id="emailLogIn" v-model="emailLogIn">
            </div>

            <div class="form-group mb-3">
              <label for="passwordLogIn">Password</label>
              <input type="password" class="form-control" id="passwordLogIn" v-model="passwordLogIn">
            </div>

            <div class="d-grid mb-3">
              <button type="submit" class="btn btn-dark btn-block">Sign In</button>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-link" data-dismiss="modal" @click="switchToSignUp">No account ? Sign up</button>
        </div>
      </div>
    </div>
  </div>

  <ModalSignUp ref="modalSignUp"></ModalSignUp> <!-- Référence à la modal d'inscription -->
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue';
import ModalSignUp from '@/components/SignUp.vue';
import {useUserStore} from "@/stores/userStore.js";
import router from "@/router/router.js";

const userStore = useUserStore();

const emailLogIn = ref('');
const passwordLogIn = ref('');

// Fonction pour passer de la modal de login à celle de signup
function switchToSignUp() {
  $("#modalSignUp").modal('show')
}

function onSubmit() {
  userStore.login();
  router.push('/')
}
</script>

<style scoped>
.modal-content {
  background-color: white;
  backdrop-filter: blur(10px);
}

</style>