<template>
  <div
      class="modal fade"
      id="modalProfile"
      tabindex="-1"
      aria-labelledby="profileModalLabel"
      aria-hidden="true"
      v-if="userStore.isLoggedIn"
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
            <p><strong>Email:</strong> {{ userStore.user.email }}</p>
            <p><strong>Username:</strong> {{ userStore.user.username }}</p>
            <p><strong>Password:</strong> ••••••••</p>
            <button class="btn btn-primary" @click="toggleEdit">Edit my info</button>
          </div>

          <!-- Edit user information section -->
          <div v-if="isEditing">
            <div class="mb-3">
              <label for="email" class="form-label">Email:</label>
              <input v-model="userStore.user.email" type="email" id="email" class="form-control" />
            </div>

            <div class="mb-3">
              <label for="username" class="form-label">Username:</label>
              <input v-model="userStore.user.username" type="text" id="username" class="form-control" />
            </div>

            <div class="mb-3">
              <label for="password" class="form-label">Password:</label>
              <input
                  :type="showPassword ? 'text' : 'password'"
                  v-model="userStore.user.password"
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
import { useUserStore } from "@/stores/userStore.js"; // Import the store
import { ref } from "vue";

export default {
  setup() {
    // Initialize the userStore
    const userStore = useUserStore();

    // Reactive flag for edit mode
    const isEditing = ref(false);

    // Toggle edit mode
    const toggleEdit = () => {
      isEditing.value = !isEditing.value;
    };

    // Save changes (you will send the actual request here later)
    const saveChanges = () => {
      console.log("request"); // Placeholder for request to backend
      isEditing.value = false;
    };

    const cancelChanges = () => {
      this.isEditing = false;
    };

    const signOut = () => {
      userStore.signOut();
      window.location.reload();
    };

    return {
      userStore,
      isEditing,
      toggleEdit,
      saveChanges,
      signOut,
    };
  },
};
</script>

<style scoped>
div {
  margin-bottom: 10px;
}
</style>