<template>
  <div class="modal fade" id="modalSignUp" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content ">
        <div class="modal-header">
          <h5 class="modal-title">Sign Up</h5>
          <button type="button" class="close" aria-label="Close" data-dismiss="modal">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group mb-3">
              <label for="name">Name</label>
              <input type="text" class="form-control" id="name" v-model="name">
            </div>
            <div class="form-group mb-3">
              <label for="email">Email</label>
              <input type="email" class="form-control" id="email" v-model="email">
            </div>

            <div class="form-group mb-3">
              <label for="password">Password</label>
              <input type="password" class="form-control" id="password" v-model="password">
            </div>
            <div class="form-group mb-3">
              <label for="confirm_password">Confirm password</label>
              <input type="password" class="form-control" id="confirm_password" v-model="confirm_password">
            </div>

            <div class="d-grid mb-3">
              <button type="submit" class="btn btn-dark btn-block">Sign Up</button>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-link" data-dismiss="modal" @click="switchToLogin">Already have an account ? Log in</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Champs de formulaire
const email = ref('');
const password = ref('');
const name = ref('');
const confirm_password = ref('');

function switchToLogin() {
  $("#modalLogin").modal('show')
}
</script>

<style scoped>
.modal-content {
  background-color: white;
  backdrop-filter: blur(10px);
}
</style>