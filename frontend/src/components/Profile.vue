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
          <h5 class="modal-title" id="profileModalLabel">👤 Profil</h5>
          <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
          ></button>
        </div>

        <div class="modal-body">
          <!-- Display user information section -->
          <div v-if="!isEditing">
            <p><strong>Email:</strong> {{ userInfo.email }}</p>
            <p><strong>Nom d'utilisateur:</strong> {{ userInfo.username }}</p>
            <p><strong>Mot de passe:</strong> ••••••••</p>
            <button class="btn btn-secondary" @click="toggleEdit">Modifier mes informations</button>
          </div>

          <!-- Edit user information section -->
          <div v-if="isEditing">
            <div class="mb-3">
              <label for="email" class="form-label">Email:</label>
              <input v-model="editInfo.email" type="email" id="email" class="form-control" />
            </div>

            <div class="mb-3">
              <label for="username" class="form-label">Nom d'utilisateur:</label>
              <input v-model="editInfo.username" type="text" id="username" class="form-control" />
            </div>

            <div class="mb-3">
              <label for="password" class="form-label">Mot de passe:</label>
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
            <button class="btn btn-primary" @click="saveChanges">Sauvegarder</button>
            <button class="btn btn-secondary" @click="cancelChanges">Annuler</button>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
  },
};
</script>

<style scoped>
/* Style pour la modale */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* Fond semi-transparent */
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  text-align: center;
}

button {
  margin-top: 10px;
  background-color: #5762ff;
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 4px;
}

button:hover {
  background-color: #92dce5;
}

div {
  margin-bottom: 10px;
}
</style>