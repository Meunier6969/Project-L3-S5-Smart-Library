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
      const API_URL = "http://localhost:1234/api";
      fetch(`${API_URL}/books/`)
          .then(response => response.json())
          .then(data => {
            this.bookList = data.map(book => new Book(
                book.id,
                book.title,
                book.author,
                "https://m.media-amazon.com/images/I/91ZYBjR+gYL._SL1500_.jpg",
                book.categories || [],
                book.description || '',
                Boolean(this.favList.includes(book.id))
            ));
            this.loadMoreBooks();  // Initial load of 8 books
          })
          .catch(error => {
            console.error("Error fetching books:", error);
          });
    },
    loadMoreBooks() {
      const start = this.currentPage * this.booksPerPage;
      const end = start + this.booksPerPage;
      const newBooks = this.bookList.slice(start, end);
      this.visibleBooks = [...this.visibleBooks, ...newBooks];
      this.currentPage += 1;
    },
    handleScroll() {
      const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight;
      if (bottom) {
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

