<template>
  <div class="container">
    <div class="row">
      <div
          v-for="book in filteredBooks"
          :key="book.id"
          class="col-12 col-md-6 col-lg-3 mb-4"
      >
        <BookCard :book="book"></BookCard>
      </div>
    </div>
  </div>
</template>

<script>
import BookCard from "@/components/BookCard.vue";

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

</style>
