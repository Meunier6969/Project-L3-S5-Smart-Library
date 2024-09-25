<template>
  <div id="app">

    <NavBar ></NavBar>

    <router-view></router-view>
  </div>
</template>

<script>
import Login from './components/Login.vue';
import SignUp from './components/SignUp.vue';
import NavBar from './components/NavBar.vue';

export default {
  components: { Login, SignUp, NavBar },

};
</script>



<style scoped>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}




</style>
