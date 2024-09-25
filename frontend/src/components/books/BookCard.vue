<template>
  <div class="card h-100" @click="openBookModal()">
    <img
        :src="this.book.cover"
        :alt="this.book.title"
        class="card-img-top"
    />
    <div class="favorite-icon" v-if="isLoggedIn">
      <i
          :class="[book.isFav ? 'bi-heart-fill' : 'bi-heart']"
          :style="{ color: book.isFav ? 'red' : 'grey' }"
          aria-hidden="true"
      ></i>
    </div>
    <div class="card-body">
      <h5 class="card-title">{{ this.book.title }}</h5>
    </div>
    <BookModal :book="book"></BookModal>
  </div>
</template>

<script>
import BookModal from "@/components/books/BookModal.vue";

export default {
  components: {BookModal},
  props: {
    book: {
      type: Object,
      required: true
    },
    isLoggedIn: {
      type: Boolean,
      required: true,
    }
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