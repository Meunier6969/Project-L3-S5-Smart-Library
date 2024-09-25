<template>
  <div>
    <BookGrid :books="bookList" :searchQuery="searchQuery"></BookGrid>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import BookGrid from "@/components/books/BookGrid.vue";
import Book from "@/models/book.js";

export default {
  name: 'Home',
  components: {BookGrid},
  props: {
    searchQuery: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      bookList: [
        new Book(1, "Foundation", "Isaac Asimov", "path-to-foundation-image", ["Science Fiction", "TV Adaptation"]),
        new Book(2, "Romeo et Juliette", "Shakespeare", "path-to-romeo-image", ["Classic", "Drama"]),
        new Book(3, "His Dark Materials", "Philipe Pullman", "path-to-his-dark-materials-image", ["Fantasy", "Adventure"]),
        new Book(4, "Dune", "Frank Herbert", "https://m.media-amazon.com/images/I/81nq+ewtkcL._SL1500_.jpg", ["Fantasy", "Science Fiction"]),
        new Book(5, "Romeo et Juliette", "Shakespeare","path-to-romeo-image", ["Classic", "Drama"]),
        new Book(6, "His Dark Materials", "Philipe Pullman","path-to-his-dark-materials-image", ["Fantasy", "Adventure"]),
        new Book(7, "Harry Potter and the Chamber of Secrets", "J.K. Rowling", "path-to-harry-potter-image", ["Fantasy", "Magic"]),
        new Book(8, "Foundation", "Isaac Asimov", "path-to-foundation-image", ["Science Fiction", "TV Adaptation"])
      ],
      favList: [1, 3, 7],
    };
  },
  beforeMount() {
    this.bookList = this.bookList.map(book => {
      return {
        ...book,
        isFav: Boolean(this.favList.includes(book.id))
      };
    });
  }
};
</script>

<style scoped>

</style>