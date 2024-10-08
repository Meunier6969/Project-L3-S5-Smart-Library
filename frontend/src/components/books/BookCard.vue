<template>
  <div class="card bg-dark" @click="openBookModal()">
    <img
        :src="book.cover"
        :alt="book.title"
        class="card-img-top"
    />
    <div class="bgIcon custom-rounded" style="height: 35px; width: 45px; background-color: hsla(240,10%,20%,0.7)"  @click="onFavoriteClicked" v-if="isLoggedIn">
      <div class="favorite-icon">
        <i
            :class="[book.isFav ? 'bi-heart-fill' : 'bi-heart']"
            :style="{ color: book.isFav ? 'red' : 'white' }"
            aria-hidden="true"
        ></i>
      </div>
    </div>
    <div class="rankIcon custom-rounded-left" style="height: 35px; width: 45px; background-color: hsla(240,10%,20%,0.7)" v-if="rank !== 0" >
      <div style="font-size: 24px;">
        <h3 :class="[rank === 1 ? 'text-gold' : (rank === 2 ? 'text-silver' : ( rank === 3 ? 'text-bronze' : 'text-white'))]">{{rank}}</h3>
      </div>
    </div>
    <div class="card-footer" style="height: 5rem">
      <h5 class="card-title text-white text-clamp">{{ book.title }}</h5>
    </div>
    <BookModal :book="book" @click-favorite="onFavoriteClicked"></BookModal>
  </div>
</template>

<script>
import BookModal from "@/components/books/BookModal.vue";
import axios from "axios";
import {useUserStore} from "@/stores/userStore.js";

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
    },
    rank: {
      type: Number,
      required: false,
      default: 0
    }
  },
  data () {
    return {
      imageLoaded: false,
      imageFailed: false,
      API_URL: "http://localhost:1234/api",
    }
  },
  methods: {
    openBookModal() {
      $('#bookModal-' + this.book.id).modal('show');
    },
    onFavoriteClicked() {
      if (this.book.isFav) {
        this.removeRavorite();
      }
      else {
        this.addFavorite();
      }
      this.book.isFav = !this.book.isFav;
    },
    async addFavorite() {
      await axios.post(this.API_URL + '/books/' + this.book.id + '/favorite', {}, {
        headers: {
          'Authorization': localStorage.getItem('authToken'),
        }
      })
    },
    async removeRavorite() {
      await axios.delete(this.API_URL + '/books/' + this.book.id + '/favorite', {
        headers: {
          'Authorization': localStorage.getItem('authToken'),
        }
      })
    },
  },
};
</script>

<style scoped>
.card {
  height: 430px;
  width: 250px;
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

.rankIcon{
  position: absolute;
  top: 0;
  left: 0;
}

.custom-rounded {
  border-radius: 0px 1px 0 5px;
}

.custom-rounded-left {
  border-radius: 0px 1px 5px 0;
}

.text-gold {
  color: goldenrod;
}
.text-silver {
  color: lightgray;
}
.text-bronze {
  color: chocolate;
}
</style>