<script setup>
import {useUserStore} from "@/stores/userStore.js";
import {ref} from 'vue';
import BookCard from "@/components/books/BookCard.vue";

const userStore = useUserStore();

const props = defineProps({
  books: {
    type: Array,
    required: true
  },
  searchQuery: {
    type: String,
    default: ''
  },
});

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
}
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
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
  scrollbar-width: none;  /* Firefox */
  white-space: nowrap; /* Prevent line breaks, force items on the same line */
  margin-left: 10%;
}

.scroll-container::-webkit-scrollbar {
  display: none;  /* Safari and Chrome */
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