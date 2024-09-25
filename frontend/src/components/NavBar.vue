<script setup>
import {useUserStore} from "@/stores/userStore.js";

const userStore = useUserStore();
</script>

<template>
  <nav class="col align-items-center">
    <h1 class="text-white">Smart Library</h1>
    <div class="row align-items-center">
      <div class=" text-white text-center" v-if="userStore.isLoggedIn">
        <i class="bi bi-person-circle icon"></i>
      </div>
      <div class=" text-white text-center" @click="$emit('open-login')" v-else>
        <i class="bi bi-box-arrow-in-right icon"></i>
      </div>
      <div class="col text-white text-center">
        <div class="flex-grow-1" style="margin-right: 2rem; margin-left: 4rem;">
          <form class="d-flex w-100">
            <input
                class="form-control w-100"
                type="search"
                placeholder="Search"
                aria-label="Search"
                v-model="searchTerm"
                @input="onSearch"
            />
          </form>
        </div>
      </div>
      <div class="dropdown show mrhalfrem">
        <i class="btn btn-secondary dropdown-toggle bi bi-sort-alpha-down" role="button" id="dropdownMenuLink"
           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        </i>

        <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <label class="dropdown-item">
            De A à Z
          </label>
          <label class="dropdown-item">
            De Z à A
          </label>
        </div>
      </div>
      <div class="text-white text-center">
        <div class="dropdown show">
          <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
             data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Filters
          </a>

          <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <label class="dropdown-item">
              Catégorie 1 <input type="checkbox">
            </label>
            <label class="dropdown-item">
              Catégorie 2 <input type="checkbox">
            </label>
            <label class="dropdown-item">
              Catégorie 3 <input type="checkbox">
            </label>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Favoris</a>
          </div>
        </div>

      </div>

    </div>
    <ModalLogin ref="modalLogin"></ModalLogin>
  </nav>
</template>

<script>
import ModalLogin from '@/components/Login.vue';
export default {
  components: {
    ModalLogin
  },
  data() {
    return {
      searchTerm: ''
    };
  },
  methods: {
    onSearch() {
      console.log(this.searchTerm);
      this.$emit('search', this.searchTerm);
    },
    openModalLogin() {
      this.$refs.modalLogin.open();
    }

  }

};
</script>

<style scoped>
nav {
  padding-top: 1rem;
  padding-bottom: 1rem;
  width: 80%;

  margin: 0 auto;
}

.icon {
  font-size: 2rem;
  cursor: pointer;
}

.mrhalfrem {
  margin-right: .5rem;
}
</style>

