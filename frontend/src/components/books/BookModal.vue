<script setup>
import {useUserStore} from "@/stores/userStore.js";

const userStore = useUserStore();

const props = defineProps({
  book: {
    Object,
    required: true,
  }
})
</script>

<template>
  <div class="modal fade" :id="'bookModal-' + book.id" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ this.book.title }}</h5>
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
              <p style="text-align: justify">
                Paul Atreides, un jeune homme brillant et doué au destin plus grand que lui-même, doit se rendre sur la
                planète la plus dangereuse de l'univers afin d'assurer l'avenir de sa famille et de son peuple. Cette
                planète est la source exclusive de la ressource la plus précieuse qui soit pour laquelle des forces
                sinistres déclenchent un conflit dont seuls ceux sachant maîtriser leurs peurs survivront.
              </p>
            </div>

          </div>

        </div>
        <div class="modal-footer">
          <div v-if="userStore.isLoggedIn">
            <button class="btn btn-primary" v-if="!this.book.isFav">Add to favorites</button>
            <button class="btn btn-danger" v-else>Remove from favorites</button>
          </div>
          <div class="col" v-else>
            <button class="btn btn-primary" disabled>Add to favorites</button>
            <p class="mt-1">You need to<a href="#" class="text-decoration-none" @click="$emit('open-login')">login</a>to
              manage favorites
            </p>
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