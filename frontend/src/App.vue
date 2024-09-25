<template>
  <div id="app">

    <NavBar @open-login="openLogin"></NavBar>


    <div v-if="showLogin" class="modal" @click.self="showLogin=false">
      <Login @close="showLogin = false" @switchToSignUp="switchToSignUp" />
    </div>


    <div v-if="showSignUp" class="modal" @click.self="showSignUp=false">
      <SignUp @close="showSignUp = false" />
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
import Login from './components/Login.vue';
import SignUp from './components/SignUp.vue';
import NavBar from './components/NavBar.vue';

export default {
  components: { Login, SignUp, NavBar },
  data() {
    return {
      showLogin: false,
      showSignUp: false,
    };
  },
  methods: {
    switchToSignUp() {
      this.showLogin = false;
      this.showSignUp = true;
    },
    openLogin() {
      this.showLogin = true;
    }
  }
};
</script>



<style scoped>
/* Global styles */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.modal{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Couche semi-transparente */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050; /* Doit être au-dessus du reste du contenu */
}

/* Styles pour centrer la modale */

</style>
