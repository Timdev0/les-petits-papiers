<template>
  <div class="books-vue" v-if="!$apollo.loading">
    <div class="books-container container">
      <div
        v-for="(booksGroup, i) in chunk(allBooks, 3)"
        :key="'book-group-' + i"
        class="row"
      >
        <div
          v-for="(book, e) in booksGroup"
          :key="'all-books-item-' + e"
          class="col-lg-3 col-md-4 col-sm-4 col-4 d-flex align-items-stretch"
        >
          <book :book="book" class="d-flex align-items-stretch" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { AllBooks } from '../queries';
import { chunkMixin } from '../mixins/chunk';
import Book from '../components/Book.vue';

export default {
  name: 'Books',

  mixins: [chunkMixin],

  components: {
    Book,
  },

  apollo: {
    allBooks() {
      return {
        query: AllBooks,
        fetchPolicy: 'no-cache',
        variables: {
          first: 20,
          skip: 0,
        },
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.books-container {
  margin: 32px auto;
  padding: 24px;
  background-color: #fff;
  border-radius: 4px;
}
</style>
