<template>
  <div class="card h-100" @click="openBookModal()">
    <img
        :src="this.book.cover"
        :alt="this.book.title"
        class="card-img-top"
    />
    <div class="favorite-icon">
      <i
          :class="[book.isFav ? 'bi-heart-fill' : 'bi-heart']"
          :style="{ color: book.isFav ? 'red' : 'grey' }"
          aria-hidden="true"
      ></i>
    </div>
    <div class="card-body">
      <h5 class="card-title">{{ this.book.title }}</h5>
      <p class="card-text">
        Categories:
        <span v-for="(category, index) in this.book.categories" :key="index">
                {{ category }}<span v-if="index < this.book.categories.length - 1">, </span>
              </span>
      </p>
    </div>
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
            <button class="btn btn-primary" v-if="!this.book.isFav">Réserver</button>
            <button class="btn btn-danger" v-else>Rendre</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Book from "@/models/book.js";
export default {
  props: {
    book: {
      type: Object,
      required: true
    },
  },
  methods: {
    openBookModal() {
      $('#bookModal-' + this.book.id).modal('show');
    }
  },
};
</script>

<style scoped>
.card {
  max-height: 100%;
  cursor: pointer;
}
.card-img-top {
  height: 200px;
  object-fit: cover;
}
.favorite-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
}
</style>