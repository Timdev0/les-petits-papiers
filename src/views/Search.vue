<template>
  <div id="search-view">
    <div v-if="$apollo.loading" class="loading-screen container">
      <self-building-square-spinner :animation-duration="3000" :size="50" color="#2C3E50" />

      <p>Recherche en cours pour le livre "{{query}}"...</p>
    </div>

    <div v-else class="search-container container">
      <h2>Résultats de votre recherche "{{query}}"</h2>

      <div
        v-for="(booksGroup, i) in chunk(allBooks, itemsPerRow)"
        :key="'book-group-' + i"
        class="row"
      >
        <div
          v-for="(book, e) in booksGroup"
          :key="'all-books-item-' + e"
          class="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-6 d-flex align-items-stretch"
        >
          <book :book="book" class="d-flex align-items-stretch" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SelfBuildingSquareSpinner } from 'epic-spinners';

import { AllBooksSearch } from '../queries';
import { chunkMixin } from '../mixins/chunk';
import { itemsPerRowMixin } from '../mixins/items-per-row';
import Book from '../components/Book.vue';

export default {
  name: 'search',

  components: {
    SelfBuildingSquareSpinner,
    Book,
  },

  mixins: [chunkMixin, itemsPerRowMixin],

  data() {
    const urlWithoutHash = window.location.href.replace('/#/', '/');
    const url = new URL(urlWithoutHash);
    const decodedQuery = decodeURIComponent(
      url.searchParams.get('query') || '',
    );

    return {
      query: decodedQuery,
    };
  },

  apollo: {
    allBooks: {
      query: AllBooksSearch,
      variables() {
        return {
          searchRegex: `(${this.query})`,
        };
      },
    },
  },

  watch: {
    $route(to) {
      const decodedQuery = decodeURIComponent(to.query.query || '');

      this.query = decodedQuery;
    },
  },

  beforeMount() {

  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/loading-screen";

h2 {
  font-size: 2rem;
  margin-bottom: 24px;
  text-align: center;
}

.row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
}

.search-container {
  margin: 32px auto;
  padding: 24px;
  background-color: #fff;
  border-radius: 4px;
}
</style>
