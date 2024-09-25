<script>
import Profile from "@/components/Profile.vue";
export default {
  name: "App",
  components: { Profile },

  methods: {
    openLogin() {
      this.isLoginModalVisible = true; // Ouvrir la modal
    },
  },
};
</script>

<template>
  <Profile></Profile>
</template>

<style scoped></style>
