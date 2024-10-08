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
          <form @submit.prevent="onSubmit">
            <div class="form-group mb-3">
              <label for="emailLogIn">Email</label>
              <input class="form-control" id="emailLogIn" v-model="formData.email">
            </div>

            <div class="form-group mb-3">
              <label for="passwordLogIn">Password</label>
              <input type="password" class="form-control" id="passwordLogIn" v-model="formData.password">
            </div>

            <div class="d-grid mb-3">
              <button type="submit" class="btn btn-dark btn-block">Sign In</button>
            </div>
          </form>

          <p v-if="errorMessage">{{ errorMessage }}</p>
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
import {ref, getCurrentInstance, reactive} from 'vue';
import ModalSignUp from '@/components/SignUp.vue';
import {useUserStore} from "@/stores/userStore.js";
import router from "@/router/router.js";
import axios from "axios";
import {useRouter} from "vue-router";

const userStore = useUserStore();

const formData = reactive({
  email: '',
  password: ''
});

const errorMessage = ref('');
const API_URL = 'http://localhost:1234/api'

// Fonction pour passer de la modal de login à celle de signup
function switchToSignUp() {
  $("#modalSignUp").modal('show')
}

const onSubmit = async () => {
  try {
    const response = await axios.post(API_URL + '/users/login', {
      email: formData.email,
      pwd: formData.password,
    });

    const { token, user } = response.data;
    localStorage.setItem('authToken', token);
    userStore.login(user.user_id, user.pseudo, user.email, '', user.role === 1);
    $("#modalLogin").modal('hide')
  } catch (error) {
    errorMessage.value = 'Login failed. Please check your email and password.';
  }
};
</script>

<style scoped>
.modal-content {
  background-color: white;
  backdrop-filter: blur(10px);
}

</style>