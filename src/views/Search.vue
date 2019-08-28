<template>
  <div id="search-view">
    <loading v-if="$apollo.loading" :loading="$apollo.loading" :text="'Recherche en cours...'" />

    <div v-else class="search-container container">
      <h2>Résultats de votre recherche</h2>

      <book-search-filters class="mb-20" />

      <div
        v-for="(booksGroup, i) in chunk(allBooks, itemsPerRow)"
        :key="'book-group-' + i"
        class="row"
      >
        <div
          v-for="(book, e) in booksGroup"
          :key="'all-books-item-' + e"
          class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6 d-flex align-items-stretch"
        >
          <book :book="book" class="d-flex align-items-stretch" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { AllBooksSearch } from '../queries';
import { chunkMixin } from '../mixins/chunk';
import { itemsPerRowMixin } from '../mixins/items-per-row';
import Book from '../components/Book.vue';
import BookSearchFilters from '../components/BookSearchFilters.vue';
import Loading from '../components/Loading.vue';

export default {
  name: 'search',

  components: {
    Book,
    BookSearchFilters,
    Loading,
  },

  mixins: [chunkMixin, itemsPerRowMixin],

  data() {
    const urlWithoutHash = window.location.href.replace('/#/', '/');
    const url = new URL(urlWithoutHash);

    const decodedQuery = decodeURIComponent(
      url.searchParams.get('query') || '',
    );

    const decodedCategory = decodeURIComponent(
      url.searchParams.get('category') || '',
    );

    const decodedAuthor = decodeURIComponent(
      url.searchParams.get('author') || '',
    );

    const decodedEditor = decodeURIComponent(
      url.searchParams.get('editor') || '',
    );

    return {
      query: decodedQuery,
      category: decodedCategory,
      author: decodedAuthor,
      editor: decodedEditor,
    };
  },

  apollo: {
    allBooks: {
      query: AllBooksSearch,
      variables() {
        return {
          searchRegex: `(${this.query})`,
          categoryId: this.category ? this.category : null,
          authorId: this.author ? this.author : null,
          editorId: this.editor ? this.editor : null,
        };
      },
    },
  },

  watch: {
    $route(to) {
      const decodedQuery = decodeURIComponent(to.query.query || '');
      const decodedAuthor = decodeURIComponent(to.query.author || -1);
      const decodedCategory = decodeURIComponent(to.query.category || -1);
      const decodedEditor = decodeURIComponent(to.query.editor || -1);

      this.query = decodedQuery;
      this.category = decodedCategory;
      this.author = decodedAuthor;
      this.editor = decodedEditor;
    },
  },
};
</script>

<style lang="scss" scoped>
h2 {
  font-size: 2rem;
  margin-bottom: 24px;
  text-align: center;
}

.row {
  display: flex;
  margin-bottom: 24px;
}

.search-container {
  margin: 32px auto;
  padding: 24px;
  background-color: #fff;
  border-radius: 4px;
}
</style>
