<script setup>
const props = defineProps({
  book: {
    Object,
    required: true,
  }
})
</script>

<template>
  <div class="modal fade" :id="'bookModal-' + book.id" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ this.book.title }}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <img
              :src="this.book.cover"
              :alt="this.book.title"
              class="img-fluid"
          />
          <p class="mt-3">Categories:
            <span v-for="(category, index) in this.book.categories" :key="index">
                {{ category }}<span v-if="index < this.book.categories.length - 1">, </span>
              </span>
          </p>
          <div v-if="isLoggedIn">
            <button class="btn btn-primary" v-if="!this.book.isFav">Add to favorites</button>
            <button class="btn btn-danger" v-else>Remove from favorites</button>
          </div>
          <div class="col" v-else>
            <button class="btn btn-primary" disabled>Add to favorites</button>
            <p class="mt-1">You need to<a href="#" class="text-decoration-none" @click="">login</a> to manage favorites
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>