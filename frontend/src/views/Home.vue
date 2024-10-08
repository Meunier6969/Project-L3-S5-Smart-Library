<template>
  <div>
    <div v-if="searchQuery === ''">
      <h3 class="text-white" style="text-align: start; margin-left: 10vw">
        Most searched books
      </h3>
      <BookRow
          :searchQuery="searchQuery"
          style="margin-bottom: 1.5rem"
      />
    </div>
    <h3 class="text-white" style="text-align: start; margin-left: 10vw">
      All books
    </h3>
    <BookGrid :books="visibleBooks" :searchQuery="searchQuery" style="height: 80vh;"/>
  </div>
</template>

<script>
import {onBeforeUnmount, onMounted, ref} from 'vue'; // Import Composition API functions
import BookGrid from "@/components/books/BookGrid.vue";
import Book from "@/models/book.js";
import BookRow from "@/components/books/BookRow.vue";
import axios from "axios";
import {useUserStore} from "@/stores/userStore.js";

export default {
  name: 'Home',
  components: {BookRow, BookGrid},
  props: {
    searchQuery: {
      type: String,
      required: true,
    }
  },
  setup(props) {
    const bookList = ref([]);
    const visibleBooks = ref([]);  // Books to display
    const booksPerPage = 8;
    const currentPage = ref(0);

    const fetchBooks = async () => {
      const categories = [
        "Science Fiction",
        "Mystery and Thriller",
        "Children's Book",
        "Historical",
        "Educational"
      ];

      const API_URL = "http://localhost:1234/api";
      // Fetching user's favorite book list
      const favList = (await axios.get(API_URL + '/users/' + useUserStore().user.id + '/favorites')).data.favorites;
      console.log(favList);

      // Fetching books
      fetch(`${API_URL}/books`)
          .then(response => response.json())
          .then(data => {
            bookList.value = data.map(book => new Book(
                book.book_id,
                book.title,
                book.author,
                book.img,
                categories[book.category_id - 1],
                book.description || '',
                Boolean(favList.includes(book.book_id))
            ));
            console.log(bookList.value);
            loadMoreBooks();  // Initial load of 8 books
          });
    };

    const loadMoreBooks = () => {
      const start = currentPage.value * booksPerPage;
      const end = Math.min(start + booksPerPage, bookList.value.length); // Ensure not to exceed array length
      const newBooks = bookList.value.slice(start, end);
      visibleBooks.value = [...visibleBooks.value, ...newBooks];
      currentPage.value += 1;

      if (end >= bookList.value.length) {
        // Optionally disable scroll if necessary
        window.removeEventListener('scroll', handleScroll);
      }
    };

    const handleScroll = () => {
      const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50; // Add a 50px offset
      if (bottom && currentPage.value * booksPerPage < bookList.value.length) {
        loadMoreBooks();
      }
    };

    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
      fetchBooks();
    });

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    return {
      bookList,
      visibleBooks,
      fetchBooks,
      loadMoreBooks,
      handleScroll
    };
  }
};
</script>