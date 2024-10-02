<script setup>
import {useUserStore} from "@/stores/userStore.js";

const userStore = useUserStore();
</script>

<template>
  <nav class="col">
    <h1 class="text-white">Smart Library</h1>
    <!--Main container-->
    <div class="row align-items-center">
      <!--User icon top left-->
      <div>
        <div class="text-white text-center" v-if="userStore.isLoggedIn" @click="openModalProfile">
          <i class="bi bi-person-circle icon"></i>
        </div>
        <div class="text-white text-center" @click="openModalLogin" v-else>
          <i class="bi bi-box-arrow-in-right icon"></i>
        </div>
      </div>

      <!--Search bar-->
      <div class="col text-white text-center">
        <div class="flex-grow-1" style="margin: 0 2rem">
          <form class="d-flex w-100">
            <div class="input-group" >
              <div class="input-group-prepend">
                <i class="bi bi-search input-group-text" id="basic-addon1"></i>
              </div>
              <input
                  class="form-control"
                  style="border:  1px solid #FFFFFF; box-shadow: none;"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  v-model="searchTerm"
                  @input="onSearch"
                  aria-describedby="search-addon"
              />
              <!-- Icône de croix -->
              <div v-if="searchTerm" class="input-group-append" @click="clearSearch" style="cursor: pointer;">
                <i class="bi bi-x input-group-text " style="background-color:#ffffff ; border: none"></i>
              </div>
            </div>
          </form>
        </div>
      </div>

      <!--Dropdowns-->
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
                Science Fiction <input type="checkbox" v-model="filters.sf">
              </label>
              <label class="dropdown-item">
                Mystery & Thriller <input type="checkbox" v-model="filters.mystery">
              </label>
              <label class="dropdown-item">
                Historical <input type="checkbox" v-model="filters.history">
              </label>
              <label class="dropdown-item">
                Educational <input type="checkbox" v-model="filters.education">
              </label>
              <label class="dropdown-item">
                For Children <input type="checkbox" v-model="filters.children">
              </label>
              <div v-if="userStore.isLoggedIn">
              <div class="dropdown-divider"></div>
              <label class="dropdown-item">
                Favorites <input type="checkbox" v-model="favOnlyBinding">
              </label>
              </div>
            </div>
          </div>
        </div>
      </div>
  </nav>
  <ModalLogin></ModalLogin>
  <ModalProfile></ModalProfile>
</template>

<script>
import ModalLogin from '@/components/Login.vue';
import ModalProfile from '@/components/Profile.vue';

import {useFilterStore} from "@/stores/filterStore.js";


export default {
  components: {
    ModalLogin,
    ModalProfile
  },
  data() {
    return {
      searchTerm: '',
      filters: {
        sf: false,
        mystery: false,
        history: false,
        education: false,
        children: false,
        fav: false,
      },
      favRef : undefined,
    };
  },
  computed: {
    favOnlyBinding: {
      get: function () {
        return useFilterStore().favOnly;
      },
      set: function (value) {
        useFilterStore().favOnly = value;
      }
    }
  },
  methods: {
    onSearch() {
      this.$emit('search', this.searchTerm);
    },
    clearSearch() {
      this.searchTerm = '';
      this.onSearch();
    },
    openModalLogin() {
      $("#modalLogin").modal('show');
    },
    openModalProfile() {
      $("#modalProfile").modal('show');
    }
  },

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

input {
  margin-left: auto;
}
</style>

