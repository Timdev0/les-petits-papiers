<template>
  <div id="book-detail-view">
    <div v-if="$apollo.loading || !book" class="loading-screen container">
      <self-building-square-spinner :animation-duration="3000" :size="50" color="#2C3E50" />

      <p>Chargement en cours...</p>
    </div>

    <div v-else class="book-detail-container container">
      <div class="row">
        <div class="col-md-4 order-2 order-md-1">
          <img class="img-fluid img-book" :src="book.image.url" alt="">
        </div>
        <div class="col-md-8 order-1 order-md-2">
          <h2 class="book-name">{{ book.name }}</h2>
          <p class="author">De {{ book.author.name }}</p>
          <p class="editor">{{ book.editor.name }}</p>
          <p class="categorie"></p>
          <p v-if="book.available===true" class="en-stock">En stock</p>
          <p v-else class="hors-stock">Hors stock</p>
          <p v-if="book.summary" class="summary text-justify">{{ book.summary }}</p>
          <div class="row">
            <div class="col-6">
              <p>EAN13</p>
            </div>
            <div class="col-6">
              <p>{{ book.ean13 }}</p>
            </div>

            <div class="col-6">
              <p>ISBN</p>
            </div>
            <div class="col-6">
              <p>{{ book.isbn }}</p>
            </div>

            <div class="col-6">
              <p>Éditeur</p>
            </div>
            <div class="col-6">
              <p>{{ book.editor.name }}</p>
            </div>

            <div class="col-6">
              <p>Catégorie</p>
            </div>
            <div class="col-6">
              <p></p>
            </div>

            <div class="col-6">
              <p>Collection</p>
            </div>
            <div class="col-6">
              <p>{{ book.collection.nom }}</p>
            </div>

            <div class="col-6">
              <p>Date de publication</p>
            </div>
            <div class="col-6">
              <p>{{ book.publishDate }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SelfBuildingSquareSpinner } from 'epic-spinners';

import { Book } from '../queries';

export default {
  name: 'book-detail',

  components: {
    SelfBuildingSquareSpinner,
  },

  computed: {
    /**
     * A SlugID is composed of "book.id-book.slug"
     *
     * @returns {string}
     */
    slugID() {
      return this.$route.params.id;
    },

    /**
     * Extract the ID of the book from the slug param
     *
     * @returns {string}
     */
    bookID() {
      return this.slugID.substr(0, this.slugID.indexOf('-'));
    },

    /**
     * Extract the slug name of the book from the slug param
     *
     * @returns {string}
     */
    slug() {
      return this.slugID.substr(this.slugID.indexOf('-') + 1, this.slugID.length);
    },
  },

  apollo: {
    book() {
      return {
        query: Book,
        fetchPolicy: 'no-cache',
        variables: {
          id: this.bookID,
        },
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/loading-screen";

.book-detail-container {
  margin: 32px auto;
  padding: 24px;
  background-color: #fff;
  border-radius: 4px;
}
.img-book{
  border-radius: 4px;
}
</style>
