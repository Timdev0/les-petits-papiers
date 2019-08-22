<template>
  <div id="book-detail-view">
    <div v-if="$apollo.loading || !book" class="loading-screen container">
      <self-building-square-spinner :animation-duration="3000" :size="50" color="#2C3E50" />

      <p>Chargement en cours...</p>
    </div>

    <div v-else class="book-detail-container container"></div>
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
</style>
