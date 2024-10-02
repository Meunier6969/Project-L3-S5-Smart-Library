<template>
  <div id="userManager" class="container justify-content-center w-100">
    <div class="user-manager-header">
      <h2>User Manager</h2>
      <button @click="addUser" class="btn btn-primary">Add User</button>
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
      <tr v-for="(user, index) in users" :key="user.id">
        <td>{{ index + 1 }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.role }}</td>
        <td>
          <button @click="editUser(user)" class="btn btn-secondary">Edit</button>
          <button @click="deleteUser(user.id)" class="btn btn-danger">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const users = ref([
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: 3, name: 'Alice Brown', email: 'alice@example.com', role: 'User' },
])

const addUser = () => {

}

const editUser = (user) => {

}

const deleteUser = (id) => {

  const confirmation = confirm('Are you sure you want to delete this user?');
  if (confirmation) {
    users.value = users.value.filter(user => user.id !== id);
  }
}
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
