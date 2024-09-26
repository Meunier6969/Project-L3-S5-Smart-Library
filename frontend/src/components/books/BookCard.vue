<template>
  <div class="card text-bg-dark" @click="openBookModal()">
    <div class="bgIcon  custom-rounded" style="height: 35px; width: 45px; background-color: hsla(0,0%,55%,0.51)"></div>
  <!--hsla(0,0%,55%,0.31)-->
    <img
        :src="this.book.cover"
        :alt="this.book.title"
        class="card-img-top"
    />
    <div class="favorite-icon" v-if="isLoggedIn">
      <!-- Background for the icon -->

      <i
          :class="[book.isFav ? 'bi-heart-fill' : 'bi-heart']"
          :style="{ color: book.isFav ? 'red' : 'black' }"
          aria-hidden="true"
      ></i>

    </div>

    <div class="card-footer ">
      <h5 class="card-text">{{ this.book.title }}</h5>
    </div>
    <BookModal :book="book"></BookModal>
  </div>
</template>

<script>
import BookModal from "@/components/books/BookModal.vue";

export default {
  components: {BookModal},
  props: {
    book: {
      type: Object,
      required: true
    },
    isLoggedIn: {
      type: Boolean,
      required: true,
    }
  },
  data () {
    return {
      imageLoaded: false,
      imageFailed: false,
    }
  },
  methods: {
    openBookModal() {
      $('#bookModal-' + this.book.id).modal('show');
    },
  },
};
</script>

<style scoped>
.card {
  max-height: 100%;
  cursor: pointer;
}
.card-img-top {
  height: 350px;
  object-fit: cover;
}
.favorite-icon {
  position: absolute;
  top: 0;
  right: 10px;
  font-size: 24px;
}
.bgIcon{
  position: absolute;
  top: 0;
  right: 0;
}

.custom-rounded {
  border-radius: 5px 1px 0 5px;
}
</style>