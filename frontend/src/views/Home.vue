<template>
  <div>
    <div v-if="searchQuery === ''">
    <h3 class="text-white" style="text-align: start; margin-left: 10vw">Most searched books</h3>
    <BookRow :books="bookList" :searchQuery="searchQuery" style="margin-bottom: 1.5rem"/>
    </div>
    <h3 class="text-white" style="text-align: start; margin-left: 10vw">All books</h3>
    <BookGrid :books="bookList" :searchQuery="searchQuery"/>
  </div>
</template>

<script>
import BookGrid from "@/components/books/BookGrid.vue";
import Book from "@/models/book.js";
import BookRow from "@/components/books/BookRow.vue";

export default {
  name: 'Home',
  components: {BookRow, BookGrid},
  props: {
    searchQuery: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      bookList: [
        new Book(1, "Foundation", "Isaac Asimov", "https://m.media-amazon.com/images/I/91ZYBjR+gYL._SL1500_.jpg", ["Science Fiction", "TV Adaptation"], "Depuis douze mille ans, l'Empire Galactique a régné en maître. Maintenant, il est en train de mouriMais seul Hari Sheldon, créateur de la science révolutionnaire de la psychohistoire, peut voir dans l'avenir - à un âge sombre d'ignorance, de barbarie et de guerre qui durera trente mille ans. Pour préserver la connaissance et sauver l'humanité, Seldon rassemble les meilleurs esprits de l'Empire - à la fois scientifiques et érudits - et les amène sur une planète sombre au bord de la galaxie pour servir de phare d'espoir pour les générations fututres. Il appelle son sanctuaire la Fondation.\n"),
        new Book(2, "Romeo et Juliette", "Shakespeare", "https://m.media-amazon.com/images/I/616qjYabkcL._SL1500_.jpg", ["Classic", "Drama"], "A new pocket edition of William Shakespeare's classic romantic tragedy Romeo and Juliet. The classic and timeless tale of two star-crossed lovers from rival families -- Romeo Montague and Juliet Capulet -- who tragically fall in love and meet their tragic end. One of the most influential and enduringly popular plays of all time, Romeo and Juliet is perhaps one of the greatest romances and tragedies ever told."),
        new Book(3, "Northern Lights", "Philipe Pullman", "https://m.media-amazon.com/images/I/71OAhdUIgIL._SL1000_.jpg", ["Fantasy", "Adventure"], "Published in 40 countries, Philip Pullman's His Dark Materials trilogy--The Golden Compass, The Subtle Knife, and The Amber Spyglass--has graced the New York Times, Wall Street Journal, San Francisco Chronicle, Book Sense, and Publishers Weekly bestseller lists. In 1996, The Golden Compass changed the face of fantasy publishing, and 2006 marks its 10 Year Anniversary--and an opportunity to celebrate with a deluxe hardcover. Pullman created new material just for this edition (archival documents, scientific notes and \"found\" letters of Lord Asriel) which has been illustrated and handlettered by renowned British artist Ian Beck and will be included in the back matter. The deluxe edition also features Pullman's own chapter opening spot art. A quality collectible--with the enticement of never-before-seen new material--for Pullman fans."),
        new Book(4, "Dune", "Frank Herbert", "https://m.media-amazon.com/images/I/81nq+ewtkcL._SL1500_.jpg", ["Fantasy", "Science Fiction"], "Paul Atreides, un jeune homme brillant et doué au destin plus grand que lui-même, doit se rendre sur la planète la plus dangereuse de l'univers afin d'assurer l'avenir de sa famille et de son peuple. Cette planète est la source exclusive de la ressource la plus précieuse qui soit pour laquelle des forces sinistres déclenchent un conflit dont seuls ceux sachant maîtriser leurs peurs survivront."),
        new Book(5, "Harry Potter and the Chamber of Secrets", "J.K. Rowling", "https://m.media-amazon.com/images/I/918wxhKJaPL._SL1500_.jpg", ["Fantasy", "Magic"], ),
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