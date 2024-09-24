<template>
  <nav class="row align-items-center">
    <div class="col text-white text-center p-3"><i class="bi bi-person-circle icon"></i></div>
    <div class="col text-white text-center p-3">
      <div class="flex-grow-1 mx-3">
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
    <div class="col text-white text-center p-3">
      <div class="dropdown show">
        <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Filtres
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
  </nav>
</template>

<script>
export default {
  data() {
    return {
      searchTerm: ''
    };
  },
  methods: {
    onSearch() {
      this.$emit('search', this.searchTerm);
    }
  }
};
</script>

<style scoped>
nav {
  padding-top: 1rem;
  padding-bottom: 1rem;
}
.icon {
  font-size: 2rem;
}
</style>

