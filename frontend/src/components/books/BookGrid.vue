<script setup>
import {useUserStore} from "@/stores/userStore.js";
const userStore = useUserStore();
</script>

<template>
  <div class="container grid-container">
    <div class="row">
      <div
          v-for="(book, index) in filteredBooks"
          :key="book.id"
          :class="[
          'col-12 col-md-6 col-lg-3 mb-4',
          { 'pl-0': index % 4 === 0 }, /* No padding-left for first column in a row */
          { 'pr-0': (index + 1) % 4 === 0 } /* No padding-right for last column in a row */
        ]"
      >
        <BookCard :book="book" :isLoggedIn="userStore.isLoggedIn"></BookCard>
      </div>
    </div>
  </div>
</template>

<script>
import BookCard from "@/components/books/BookCard.vue";

export default {
  components: {BookCard},
  props: {
    books: {
      type: Array,
      required: true
    },
    searchQuery: {
      type: String,
      default: ''
    }
  },
  computed: {
    filteredBooks() {
      if (!this.searchQuery) {
        return this.books;
      }
      const query = this.searchQuery.toLowerCase();
      return this.books.filter(book =>
          book.title.toLowerCase().includes(query) ||
          book.categories.some(category =>
              category.toLowerCase().includes(query)
          )
      );
    }
  }
};
</script>

<style scoped>
.grid-container {
  width: 80%;
  padding-left: 0;
  padding-right: 0;
}

.pl-0 {
  padding-left: 0 !important; /* Remove left padding */
}

.pr-0 {
  padding-right: 0 !important; /* Remove right padding */
}
</style>
