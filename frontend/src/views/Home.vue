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
import { onBeforeUnmount, onMounted, ref } from 'vue';
import BookGrid from "@/components/books/BookGrid.vue";
import Book from "@/models/book.js";
import BookRow from "@/components/books/BookRow.vue";
import axios from "axios";
import { useUserStore } from "@/stores/userStore.js";

export default {
  name: 'Home',
  components: { BookRow, BookGrid },
  props: {
    searchQuery: {
      type: String,
      required: true
    }
  },
  watch: {
    searchQuery(newVal, oldVal) {
      this.resetPage();
      this.fetchBooks();
    },
  },
  setup(props) {
    const visibleBooks = ref([]);   // Livres visibles à l'utilisateur
    const booksPerPage = 8;        // Nombre de livres par chargement
    const currentPage = ref(0);     // Page actuelle
    const isLoading = ref(false);
    // Fonction pour récupérer les livres avec pagination
    const fetchBooks = async () => {
      if (isLoading.value) return;
      isLoading.value = true;
      try {
        const categories = [
          "Science Fiction",
          "Mystery and Thriller",
          "Children's Book",
          "Historical",
          "Educational"
        ];
        const API_URL = "http://localhost:1234/api";
        await useUserStore().fetchFavorites();

        let request = API_URL + '/books?page=' + (currentPage.value + 1).toString() + '&limit=' + booksPerPage.toString();
        if (props.searchQuery !== '') request += '&title=' + props.searchQuery;

        const response = await axios.get(request);
        const newBooks = response.data.map(book => new Book(
            book.book_id,
            book.title,
            book.author,
            book.img,
            categories[book.category_id - 1],
            book.description || '',
        ));

        const uniqueBooks = newBooks.filter(book => !visibleBooks.value.some(existingBook => existingBook.id === book.id));

        visibleBooks.value = [...visibleBooks.value, ...uniqueBooks];
        currentPage.value += 1;
      } finally {
        isLoading.value = false;  // Libérer l'indicateur de chargement
      }
    };

    // Fonction de détection du défilement et chargement des livres
    const handleScroll = () => {
      const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50;
      if (bottom) {
        fetchBooks();  // Charger plus de livres lorsqu'on atteint le bas de la page
      }
    };

    const resetPage = () => {
      currentPage.value = 0;
    }

    // Ajouter un écouteur de défilement lorsque le composant est monté
    onMounted(() => {
      console.log("mounted")
      window.addEventListener('scroll', handleScroll);
      fetchBooks();  // Charger les premiers livres au démarrage
    });

    // Retirer l'écouteur de défilement lors du démontage du composant
    onBeforeUnmount(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    return {
      visibleBooks,
      fetchBooks,
      resetPage,
    };
  }
};
</script>
