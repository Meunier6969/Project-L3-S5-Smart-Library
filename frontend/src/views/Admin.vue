<template>
  <div id="adminManager">
    <div class="admin-header">
      <h2 style="color:#FFFFFF">Admin Manager</h2>
    </div>

    <div class="" data-toggle="buttons">
      <router-link to="/admin/books">
        <label class="btn btn-secondary active">
          <input type="radio" name="options" id="option1" autocomplete="off" checked />
          Book Manager
        </label>
      </router-link>
      <router-link to="/admin/users">
        <label class="btn btn-secondary">
          <input type="radio" name="options" id="option2"  />
          User Manager
        </label>
      </router-link>
    </div>


      <router-view></router-view>

  </div>
</template>

<script setup></script>

<style scoped>
/* Réinitialiser tous les styles du router-link */
router-link {
  all: unset;
  display: inline-block;
}

/* Assurer que les liens à l'intérieur des labels prennent les bons styles */
.btn-group .btn {
  text-decoration: none;
  color: inherit;
}

/* Styles personnalisés */



.admin-header {#adminManager {
  padding: 50px;
  background-color: #f5f5f5;

  height: 80vh;


}

  grid-column: span 2;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
}

</style>
