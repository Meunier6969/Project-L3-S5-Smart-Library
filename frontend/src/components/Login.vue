<template>
  <div class="modal" id="modalLogin" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Log In</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeModalLogin">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
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
          <button type="button" class="btn btn-link" @click="switchToSignUp">No account? Sign up</button>
        </div>
      </div>
    </div>
  </div>

  <ModalSignUp ref="modalSignUp"></ModalSignUp> <!-- Référence à la modal d'inscription -->
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue';
import ModalSignUp from '@/components/SignUp.vue';

const emailLogIn = ref('');
const passwordLogIn = ref('');

// Fonction pour ouvrir la modal de connexion
function open() {
  $('#modalLogin').modal('show'); // Utilisation de jQuery pour afficher la modal
}

// Fonction pour fermer la modal de connexion
function closeModalLogin() {
  $('#modalLogin').modal('hide');
}

// Accéder aux références via getCurrentInstance
const { proxy } = getCurrentInstance();

// Fonction pour passer de la modal de login à celle de signup
function switchToSignUp() {
  closeModalLogin(); // Fermer la modal de login
  proxy.$refs.modalSignUp.open(); // Ouvrir la modal de signup via $refs
}

defineExpose({ open });
</script>

<style scoped>
.modal-content {
  background-color: white;
  backdrop-filter: blur(10px);
}

</style>