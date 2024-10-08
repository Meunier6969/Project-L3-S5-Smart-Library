<template>
  <div id="userManager" class="container justify-content-center w-100">
    <div class="user-manager-header">
      <h2>User Manager</h2>
      <button @click="openAddUserModal" class="btn btn-primary">Add User</button>
    </div>

    <table class="table table-striped">
      <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(user, index) in users" :key="user.user_id">
        <td>{{ user.user_id}}</td>
        <td>{{ user.pseudo }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.role ? 'Admin' : 'User' }}</td>
        <td>
          <button @click="openEditUserModal(user)" class="btn btn-secondary">Edit</button>
          <button @click="deleteUser(user.user_id)" class="btn btn-danger">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>

    <!-- Modal pour ajouter un utilisateur -->
    <div class="modal fade" id="modalAddUser" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add User</h5>
            <button type="button" class="close" aria-label="Close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitAddUser">
              <div class="form-group mb-3">
                <label for="name">Name</label>
                <input type="text" class="form-control" id="name" v-model="newUser.pseudo" required>
              </div>
              <div class="form-group mb-3">
                <label for="email">Email</label>
                <input type="email" class="form-control" id="email" v-model="newUser.email" required>
              </div>
              <div class="form-group mb-3">
                <label for="pwd">Password</label>
                <input type="password" class="form-control" id="pwd" v-model="newUser.pwd" required>
              </div>
              <div class="form-group mb-3">
                <label for="role">Role</label>
                <select class="form-control" v-model="newUser.role">
                  <option value="0">User</option>
                  <option value="1">Admin</option>
                </select>
              </div>
              <div class="d-grid mb-3">
                <button type="submit" class="btn btn-dark btn-block">Add User</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal pour éditer un utilisateur -->
    <div class="modal fade" id="modalEditUser" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit User</h5>
            <button type="button" class="close" aria-label="Close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitEditUser">
              <div class="form-group mb-3">
                <label for="editName">Name</label>
                <input type="text" class="form-control" id="editName" v-model="selectedUser.pseudo" required>
              </div>
              <div class="form-group mb-3">
                <label for="editEmail">Email</label>
                <input type="email" class="form-control" id="editEmail" v-model="selectedUser.email" required>
              </div>
              <div class="form-group mb-3">
                <label for="editPwd">Password</label>
                <input type="password" class="form-control" id="editPwd" v-model="selectedUser.pwd" >
              </div>
              <div class="form-group mb-3">
                <label for="editRole">Role</label>
                <select class="form-control" v-model="selectedUser.role">
                  <option value="0">User</option>
                  <option value="1">Admin</option>
                </select>
              </div>
              <div class="d-grid mb-3">
                <button type="submit" class="btn btn-dark btn-block">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>


<script setup>
import {ref} from 'vue';
import axios from 'axios';

const users = ref([]);
const API_URL = 'http://localhost:1234/api';

const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    users.value = response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

fetchUsers();

// Utilisateur temporaire pour l'ajout
const newUser = ref({
  pseudo: '',
  email: '',
  password:"",
  role: false,
});

// Utilisateur sélectionné pour l'édition
const selectedUser = ref({
  pseudo: '',
  email: '',
  password:"",
  role: false,
});

// Fonction pour ouvrir le modal d'ajout
const openAddUserModal = () => {
  $("#modalAddUser").modal('show');
};

// Fonction pour soumettre l'ajout de l'utilisateur
const submitAddUser = async () => {
  try {
    const response = await axios.post(`${API_URL}/users/register`, newUser.value);
    await fetchUsers();
    $("#modalAddUser").modal('hide');
    newUser.value = {pseudo: '', email: '', role: false, password:""};
  } catch (error) {
    console.error('Error adding user:', error);
  }
};

// Fonction pour ouvrir le modal d'édition
const openEditUserModal = (user) => {
  selectedUser.value = { ...user };
  $("#modalEditUser").modal('show');
};

// Fonction pour soumettre l'édition de l'utilisateur
const submitEditUser = async () => {
  try {
    console.log(selectedUser.value.user_id)
    const response = await axios.patch(`${API_URL}/users/${selectedUser.value.user_id}`, selectedUser.value, {
      headers: {
        'Authorization':localStorage.getItem("authToken"),
        'Content-Type': 'application/json'
      }
    });
    await fetchUsers();
    $("#modalEditUser").modal('hide');
  } catch (error) {
    console.error('Error editing user:', error);
  }
};

// Fonction pour supprimer un utilisateur
const deleteUser = async (id) => {
  const confirmation = confirm('Are you sure you want to delete this user?');
  if (confirmation) {
    try {
      const response = await axios.delete(`${API_URL}/users/${id}`, {
        headers: {
          'Authorization':localStorage.getItem("authToken"),
          'Content-Type': 'application/json'
        }
      });
      users.value = users.value.filter(user => user.user_id !== id);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }
};
</script>


<style scoped>
#userManager {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
}

.user-manager-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th, .table td {
  padding: 10px;
  text-align: left;
}

.table th {
  background-color: #343a40;
  color: white;
}

.table-striped tr:nth-child(odd) {
  background-color: #f2f2f2;
}

.btn {
  padding: 5px 10px;
  margin-right: 5px;
}
</style>
