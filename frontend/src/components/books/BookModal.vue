<script setup>
import {useUserStore} from "@/stores/userStore.js";
import ModalLogin from "@/components/Login.vue";

const userStore = useUserStore();

const props = defineProps({
  book: {
    Object,
    required: true,
  }
});

function switchToLogin() {
  $("#modalLogin").modal('show');
}
</script>
<template>
  <div class="modal fade" :id="'bookModal-' + book.id" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header text-center align-items-center">
          <i v-if="userStore.isLoggedIn && book.isFav"
             class="bi-heart-fill"
             style="margin-right: auto; color: red"
             aria-hidden="true"
          ></i>
          <h4 class="modal-title w-100">{{ this.book.title }}</h4>

          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row align-items-center justify-content-center">
            <div class="col-4">
              <img
                  :src="this.book.cover"
                  :alt="this.book.title"
                  class="img-fluid coverimg"
              />
            </div>
            <div class="col-6">
              <h6 class="mb-1">Author:
                <span>
                  {{this.book.author}}
                </span>
              </h6>
              <h6 class="mb-3">Categories:
                <span v-for="(category, index) in this.book.categories" :key="index">
                {{ category }}<span v-if="index < this.book.categories.length - 1">, </span>
              </span>
              </h6>
              <p style="text-align: justify; white-space: normal">{{this.book.description}}
              </p>
            </div>

          </div>

        </div>
        <div class="modal-footer">
          <div class="col" v-if="userStore.isLoggedIn">
            <button class="btn btn-primary" v-if="!this.book.isFav">Add to favorites</button>
            <button class="btn btn-danger" v-else>Remove from favorites</button>
          </div>
          <div class="col" v-else>
            <button class="btn btn-primary" disabled style="cursor: not-allowed;">Add to favorites</button>
            <p class="mt-1">You need to<a href="#" class="text-decoration-none" data-dismiss="modal" @click="switchToLogin">login</a>to
              manage favorites
            </p>

            <ModalLogin ref="modalLogin"></ModalLogin>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.coverimg {
  max-width: 200px;
}
</style>