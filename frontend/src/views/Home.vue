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
  setup(props) {
    const bookList = ref([]);       // Liste complète des livres
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
        const API_URL = "http://localhost:1234/api/books";
        let favList = [];

        if (localStorage.getItem("authToken")) {
          favList = (await axios.get(`${API_URL}/users/${useUserStore().user.id}/favorites`)).data.favorites;
        }

        const response = await axios.get(`${API_URL}?page=${currentPage.value + 1}&limit=${booksPerPage}`);
        const newBooks = response.data.map(book => new Book(
            book.book_id,
            book.title,
            book.author,
            book.img,
            categories[book.category_id - 1],
            book.description || '',
            Boolean(favList.includes(book.book_id))
        ));


        bookList.value = [...bookList.value, ...newBooks];
        visibleBooks.value = [...visibleBooks.value, ...newBooks];
        console.log(visibleBooks.value)
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

    // Ajouter un écouteur de défilement lorsque le composant est monté
    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
      fetchBooks();  // Charger les premiers livres au démarrage
    });

    // Retirer l'écouteur de défilement lors du démontage du composant
    onBeforeUnmount(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    return {
      visibleBooks,
      fetchBooks
    };
  }
};
</script>
