<script setup>
import { useUserStore } from "@/stores/userStore";
import { useFilterStore } from "@/stores/filterStore";
import GPTModal from "@/components/GPTModal.vue";

// Accéder aux stores nécessaires
const userStore = useUserStore();
const filterStore = useFilterStore();

// Déclare les événements émis par le composant (openLogin, search)
const emit = defineEmits(['openLogin', 'search']);
</script>

<template>
  <nav class="col">
    <a href="/" style="padding: 0"><h1 class="text-white">Smart Library</h1></a>
    <!--Main container-->
    <div class="row align-items-center">
      <!--User icon top left-->
      <div>
        <div class="text-white text-center clickable" v-if="userStore.isLoggedIn" @click="openModalProfile">
          <i class="bi bi-person-circle icon"></i>
          <h6>{{userStore.user.username}}</h6>
        </div>
        <div class="text-white text-center clickable" @click="openModalLogin" v-else>
          <i class="bi bi-box-arrow-in-right icon"></i>
          <h6>Sign In</h6>
        </div>
      </div>

      <!--Search bar-->
      <div class="col text-white text-center">
        <div class="flex-grow-1" style="margin: 0 2rem">
          <form class="d-flex w-100">
            <div class="input-group">
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
                  ref="searchInput"
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
            De A à Z <input type='checkbox' v-model="filterStore.fromAtoZ">
          </label>
          <label class="dropdown-item" >
            De Z à A <input v-model="filterStore.fromZtoA" type='checkbox'>
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
              <input type="radio" name="category" value="sf" v-model="filterStore.categories.sf" @change="filterStore.updateCategory('sf', filterStore.categories.sf)" />
              Science Fiction
            </label>

            <label class="dropdown-item">
              <input type="radio" name="category" value="mystery" v-model="filterStore.categories.mystery" @change="filterStore.updateCategory('mystery', filterStore.categories.mystery)" />
              Mystery & Thriller
            </label>

            <label class="dropdown-item">
              <input type="radio" name="category" value="history" v-model="filterStore.categories.history" @change="filterStore.updateCategory('history', filterStore.categories.history)" />
              Historical
            </label>

            <label class="dropdown-item">
              <input type="radio" name="category" value="education" v-model="filterStore.categories.education" @change="filterStore.updateCategory('education', filterStore.categories.education)" />
              Educational
            </label>

            <label class="dropdown-item">
              <input type="radio" name="category" value="children" v-model="filterStore.categories.children" @change="filterStore.updateCategory('children',filterStore.categories.children)" />
              Children
            </label>





          <div v-if="userStore.isLoggedIn">
            <div class="dropdown-divider"></div>
            <label class="dropdown-item">
              <input type="checkbox" v-model="favOnlyBinding" />
              Favorites
            </label>


        </div>
        </div>
      </div>
      </div>
    </div>
      <!--Admin panel-->
      <div class="align-items-center justify-content-center admin-panel" v-if="userStore.isAdmin">
        <a href="/home" class="btn btn-secondary" v-if="useRoute().path.includes('admin')">Home Page</a>
        <a href="/admin" class="btn btn-secondary" v-else>Administration</a>
      </div>
  </nav>
  <ModalLogin></ModalLogin>
  <ModalProfile></ModalProfile>
  <GPTModal></GPTModal>
</template>

<script>
import ModalLogin from '@/components/Login.vue';
import ModalProfile from '@/components/Profile.vue';

import {useRoute} from "vue-router";
export default {
  components: {
    ModalLogin,
    ModalProfile
  },
  emits: ['search'],

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
      favRef: undefined,

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
  mounted() {
    // Listen for keypress events to trigger the search focus
    window.addEventListener("keydown", this.focusSearchInput);
  },
  beforeUnmount() {
    // Clean up the event listener
    window.removeEventListener("keydown", this.focusSearchInput);
  },
  methods: {
    test(category) {
      this.$emit("")
    },

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
    },
    focusSearchInput(event) {
      const ignoredKeys = ["Shift", "Control", "Alt", "Meta", "Tab"];

      // If the user presses any non-special key, focus the search input
      const activeElement = document.activeElement;
      const isTypingInOtherField = activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA";
      if (!ignoredKeys.includes(event.key) && !isTypingInOtherField) {
        this.$refs.searchInput.focus();
      }
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
}

.mrhalfrem {
  margin-right: .5rem;
}

input {
  margin-left: auto;
}

.admin-panel {
  padding: .5rem;
  border-radius: 5px;
}

.clickable {
  cursor: pointer;
}
</style>

