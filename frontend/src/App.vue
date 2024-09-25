<template>
  <div id="app">
    <NavBar ></NavBar>
    <router-view :searchQuery="searchQuery"></router-view>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import Login from "@/components/Login.vue";

export default {
  name: 'App',
  components: {NavBar, SignUp, Login},
  data() {
    return {
      searchQuery: ''
    };
  },
  methods: {
    handleSearch(query) {
      this.searchQuery = query;
      console.log(this.searchQuery);
    },
  }
};
</script>



<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 2rem;
}
</style>
