<template>
  <div>
    <div v-if="searchQuery === ''">
      <h3 class="text-white" style="text-align: start; margin-left: 10vw">
        Most searched books
      </h3>
      <BookRow
          :books="visibleBooks"
          :searchQuery="searchQuery"
          style="margin-bottom: 1.5rem"
      />
    </div>
    <h3 class="text-white" style="text-align: start; margin-left: 10vw">
      All books
    </h3>
    <BookGrid :books="visibleBooks" :searchQuery="searchQuery" style="height: 80vh;" />
  </div>
</template>

<script>
import BookGrid from "@/components/books/BookGrid.vue";
import Book from "@/models/book.js";
import BookRow from "@/components/books/BookRow.vue";

export default {
  name: 'Home',
  components: { BookRow, BookGrid },
  props: {
    searchQuery: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      bookList: [],
      visibleBooks: [],  // Books to display
      favList: [1, 3, 7],
      booksPerPage: 8,   // Number of books to load per scroll
      currentPage: 0,    // Track the current page of books being displayed
    };
  },
  methods: {
    fetchBooks() {
      const categories = [
        "Science Fiction",
        "Mystery and Thriller",
        "Children's Book", // Correction de l'apostrophe
        "Historical",
        "Educational"
      ];

      const API_URL = "http://localhost:1234/api";
      fetch(`${API_URL}/books`)
          .then(response => response.json())
          .then(data => {
            this.bookList = data.map(book => new Book(
                book.book_id,
                book.title,
                book.author,
                book.img,
                categories[book.category_id - 1], // Correction pour accéder à la bonne catégorie
                book.description || '',
                Boolean(this.favList.includes(book.id))
            ));
            this.loadMoreBooks();  // Initial load of 8 books
          })

    },
    loadMoreBooks() {
      const start = this.currentPage * this.booksPerPage;
      const end = Math.min(start + this.booksPerPage, this.bookList.length); // Assurez-vous de ne pas dépasser la longueur du tableau
      const newBooks = this.bookList.slice(start, end);
      this.visibleBooks = [...this.visibleBooks, ...newBooks];
      this.currentPage += 1;

      // Vérifiez si nous avons chargé tous les livres
      if (end >= this.bookList.length) {
        // Ici, vous pouvez désactiver le défilement si nécessaire
        window.removeEventListener('scroll', this.handleScroll);
      }
    },

    handleScroll() {
      const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50; // Ajout d'un offset de 50 pixels
      if (bottom && this.currentPage * this.booksPerPage < this.bookList.length) {
        this.loadMoreBooks();
      }
    }

  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    this.fetchBooks();
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  }
};
</script>