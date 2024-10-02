<template>
  <div class="text-center mt-5">
    <h1 class="display-4">404</h1>
    <p class="lead">Oups! Cette page n'existe pas.</p>
    <router-link to="/" class="btn btn-danger">Retour à la page d'accueil</router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style scoped>
.text-center {
  text-align: center;
}

.mt-5 {
  margin-top: 5rem;
}
h1,p{
  color: #FFFFFF;
}
</style>
