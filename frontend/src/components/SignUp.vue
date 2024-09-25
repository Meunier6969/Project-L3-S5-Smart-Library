<template>
  <!-- Conteneur principal pour la page de login avec la classe Bootstrap `d-flex` pour centrer le contenu -->
  <div class="login-page  d-flex justify-content-center align-items-center">

    <div class="card p-4 shadow-lg">
      <div class="card-body mb-4">
        <h3 class="card-title">Sign Up</h3>
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

            <button type="submit" class="btn btn-dark btn-block">Sign In</button>
          </div>

          <div class="text-center">
            <router-link to="/Login" class="text-decoration-none" @click="closeLogin">Already account ?</router-link> <br />
          </div>

        </form>
      </div>
    </div>
  </div>

</template>


<script>

export default {

  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    submitForm() {
      // Ajoute ici la logique de soumission du formulaire
      // Puis redirection après validation
    }
  }
};
</script>

<style scoped>
.login-page {
  background-color: rgba(0, 0, 0, 0.1);
}
.card {
  background-color: white;
  backdrop-filter: blur(10px);
}
</style>
