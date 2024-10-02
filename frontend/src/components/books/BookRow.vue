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
</script>

<template>
  <div class="scroll-container">
    <div class="scroll-row">
      <div v-for="(item, index) in books" :key="index" class="scroll-item">
        <BookCard :book="item" :isLoggedIn="userStore.isLoggedIn"></BookCard>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scroll-container {
  overflow-x: auto; /* Enable horizontal scroll */
  white-space: nowrap; /* Prevent line breaks, force items on the same line */
  margin-left: 10%;
}

.scroll-row {
  display: flex; /* Flexbox to arrange items in a row */
  gap: calc(8vw/3.0);
}

.scroll-item {
  height: 100%; /* Ensure each item fills the available height */
  display: flex;
}
</style>