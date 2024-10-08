<script setup>
import {useUserStore} from "@/stores/userStore.js";
import {onMounted, ref} from 'vue';
import BookCard from "@/components/books/BookCard.vue";
import axios from "axios";
import Book from "@/models/book.js";

const userStore = useUserStore();
const books = ref([]);

const props = defineProps({
  searchQuery: {
    type: String,
    default: ''
  },
});

// Function to fetch the sorted books
const fetchSortedBooks = async () => {
  const API_URL = "http://localhost:1234/api";
  const categories = [
    "Science Fiction",
    "Mystery and Thriller",
    "Children's Book",
    "Historical",
    "Educational"
  ];
  const favList = (await axios.get(API_URL + '/users/' + useUserStore().user.id + '/favorites')).data;
  const response = await axios.get(API_URL + '/books', {
    params: {
      limit: 10,
      sort: 'search_count'
    }
  });
  console.log(response.data);
  books.value = response.data.map(book => new Book(
      book.book_id,
      book.title,
      book.author,
      book.img,
      categories[book.category_id - 1],
      book.description || '',
      Boolean(favList.includes(book.book_id))
  ));
}

const imageLoaded = ref(false);
const imageFailed = ref(false);

const openBookModal = () => {
  const modalId = `#bookModal-${props.book.id}`;
  $(modalId).modal('show');
};
const scrollHorizontally = (event) => {
  // Prevent the default vertical scrolling
  event.preventDefault();
  // Scroll horizontally by the amount the user scrolled vertically
  event.currentTarget.scrollLeft += event.deltaY;
};

onMounted(() => {
  fetchSortedBooks();
})
</script>

<template>
  <div class="scroll-container" @wheel="scrollHorizontally">
    <div class="scroll-row">
      <div v-for="(item, index) in books" :key="index" class="scroll-item">
        <BookCard :book="item" :isLoggedIn="userStore.isLoggedIn" :rank="index + 1"></BookCard>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scroll-container {
  overflow-x: auto;
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
  white-space: nowrap; /* Prevent line breaks, force items on the same line */
  margin-left: 10%;
}

.scroll-container::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}

.scroll-row {
  display: flex; /* Flexbox to arrange items in a row */
  gap: 1.64vw;
}

.scroll-item {
  height: 100%; /* Ensure each item fills the available height */
  display: flex;
}
</style>