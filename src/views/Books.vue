<template>
  <div class="books-vue">
    <div v-if="$apollo.loading" class="loading-screen container">
      <self-building-square-spinner :animation-duration="3000" :size="50" color="#2C3E50" />

      <p>Chargement en cours...</p>
    </div>

    <div v-else class="books-container container">
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

import { AllBooks } from '../queries';
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
    allBooks() {
      return {
        query: AllBooks,
        fetchPolicy: 'no-cache',
        variables: {
          first: 6,
          skip: 0,
        },
      };
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
}
</style>
