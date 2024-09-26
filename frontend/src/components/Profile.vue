<template>
  <div
      class="modal fade"
      id="modalProfile"
      tabindex="-1"
      aria-labelledby="profileModalLabel"
      aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="profileModalLabel">👤 Profile</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div class="modal-body">
          <div v-if="!isEditing">
            <p><strong>Email:</strong> {{ userInfo.email }}</p>
            <p><strong>Username:</strong> {{ userInfo.username }}</p>
            <p><strong>Password:</strong> ••••••••</p>
            <button class="btn btn-primary" @click="toggleEdit">Edit my info</button>
          </div>

          <!-- Edit user information section -->
          <div v-if="isEditing">
            <div class="mb-3">
              <label for="email" class="form-label">Email:</label>
              <input v-model="editInfo.email" type="email" id="email" class="form-control" />
            </div>

            <div class="mb-3">
              <label for="username" class="form-label">Username:</label>
              <input v-model="editInfo.username" type="text" id="username" class="form-control" />
            </div>

            <div class="mb-3">
              <label for="password" class="form-label">Password:</label>
              <input
                  :type="showPassword ? 'text' : 'password'"
                  v-model="editInfo.password"
                  id="password"
                  class="form-control"
              />
              <button type="button" class="btn btn-sm btn-light" @click="togglePasswordVisibility">
                <span v-if="showPassword">👁️</span>
                <span v-else>👁️‍🗨️</span>
              </button>
            </div>

            <!-- Save/Cancel buttons -->
            <button class="btn btn-primary" @click="saveChanges" style="margin-right: 1rem;">Sauvegarder</button>
            <button class="btn btn-danger" @click="cancelChanges">Annuler</button>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="signOut">Sign out</button>
          <!--<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {useUserStore} from "@/stores/userStore.js";

export default {
  data() {
    return {
      // Données utilisateur actuelles
      userInfo: {
        email: "exemple@email.com",
        username: "Utilisateur123",
        password: "password123",
      },
      // Variables pour stocker les modifications
      editInfo: {
        email: "",
        username: "",
        password: "",
      },
      userStore: useUserStore(),
      isEditing: false, // Indique si l'utilisateur est en mode édition
      showPassword: false, // Indique si le mot de passe est visible
      isModalVisible: false, // Contrôle la visibilité de la modale
    };
  },
  methods: {
    // Activer/Désactiver le mode édition
    toggleEdit() {
      if (!this.isEditing) {
        this.editInfo = { ...this.userInfo }; // Copier les informations actuelles dans le formulaire d'édition
      }
      this.isEditing = !this.isEditing;
    },
    // Sauvegarder les modifications
    saveChanges() {
      this.userInfo = { ...this.editInfo }; // Appliquer les changements
      this.isEditing = false; // Quitter le mode édition
    },
    // Annuler les modifications
    cancelChanges() {
      this.isEditing = false;
    },
    // Changer la visibilité du mot de passe
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    signOut() {
      this.userStore.signOut();
      window.location.reload();
    }
  },
};
</script>

<style scoped>
div {
  margin-bottom: 10px;
}
</style>