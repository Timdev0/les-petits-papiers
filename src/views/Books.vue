<template>
  <div class="books-vue">
    <div v-if="$apollo.loading || !allBooks" class="loading-screen container">
      <self-building-square-spinner :animation-duration="3000" :size="50" color="#2C3E50" />

      <p>Chargement en cours...</p>
    </div>

    <div v-else class="books-container container">
      <h2>Liste des livres disponibles</h2>

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

      <div class="btn-group" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-secondary" @click="before">Précédent</button>

        <button type="button" class="btn btn-secondary" @click="next">Suivant</button>
      </div>
    </div>
  </div>
</template>

<script>
import { SelfBuildingSquareSpinner } from 'epic-spinners';

import { AllBooks, AllBooksMeta } from '../queries';
import { chunkMixin } from '../mixins/chunk';
import { itemsPerRowMixin } from '../mixins/items-per-row';
import Book from '../components/Book.vue';

export default {
  name: 'Books',

  mixins: [chunkMixin, itemsPerRowMixin],

  components: {
    SelfBuildingSquareSpinner,
    Book,
  },

  apollo: {
    _allBooksMeta: AllBooksMeta,

    allBooks() {
      return {
        query: AllBooks,
        fetchPolicy: 'no-cache',
        variables() {
          return {
            first: this.first,
            skip: this.skip,
          };
        },
      };
    },
  },

  data() {
    return {
      first: 6,
      skip: 0,
    };
  },

  methods: {
    next() {
      if (this.skip + this.first < this._allBooksMeta.count) {
        this.skip += this.first;

        window.scrollTo(0, 0);
      }
    },

    before() {
      if (this.skip - this.first >= 0) {
        this.skip -= this.first;

        window.scrollTo(0, 0);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/loading-screen";

.row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
}

.books-container {
  margin: 32px auto;
  padding: 24px;
  background-color: #fff;
  border-radius: 4px;

  h2 {
    font-size: 2rem;
    margin-bottom: 24px;
    text-align: center;
  }
}
</style>
