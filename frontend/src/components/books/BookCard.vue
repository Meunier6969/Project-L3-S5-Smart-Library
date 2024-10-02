<template>
  <div class="card bg-dark" @click="openBookModal()">
    <img
        :src="this.book.cover"
        :alt="this.book.title"
        class="card-img-top"
    />
    <div class="bgIcon  custom-rounded" style="height: 35px; width: 45px; background-color: hsla(0,0%,55%,0.51)"  v-if="isLoggedIn">
      <div class="favorite-icon">
        <i
            :class="[book.isFav ? 'bi-heart-fill' : 'bi-heart']"
            :style="{ color: book.isFav ? 'red' : 'black' }"
            aria-hidden="true"
        ></i>
      </div>
    </div>
    <div class="card-footer" style="height: 5rem">
      <h5 class="card-title text-white text-clamp">{{ this.book.title }}</h5>
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
  height: 430px;
  width: 18vw;
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

.text-clamp {
  overflow: hidden;
  text-overflow: ellipsis;

  display: block;
  max-height: 3rem;
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