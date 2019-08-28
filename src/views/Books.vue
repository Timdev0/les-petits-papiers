<template>
  <div class="books-vue">
    <loading v-if="$apollo.loading" :loading="$apollo.loading" :text="'Chargement en cours...'" />

    <div v-else class="books-container container">
      <h2>Liste des livres disponibles</h2>

      <div class="container mb-16">
        <div class="row items-center">
          <div class="col-4">
            <p class="font-bold mb-0">Catégorie</p>
          </div>

          <div class="col-8">
            <select v-model="filters.category" class="form-control">
              <option :value="-1">Toutes catégories</option>

              <option
                v-for="(category, i) in allCategories"
                :key="'select-category-' + i"
                :value="category.id"
              >{{ category.name }}</option>
            </select>
          </div>
        </div>

        <div class="row items-center">
          <div class="col-4">
            <p class="font-bold mb-0">Auteur</p>
          </div>

          <div class="col-8">
            <select v-model="filters.author" class="form-control">
              <option :value="-1">Tous les auteurs</option>

              <option
                v-for="(author, i) in allAuthors"
                :key="'select-author-' + i"
                :value="author.id"
              >{{ author.name }}</option>
            </select>
          </div>
        </div>

        <div class="row items-center">
          <div class="col-4">
            <p class="font-bold mb-0">Editeur</p>
          </div>

          <div class="col-8">
            <select v-model="filters.editor" class="form-control">
              <option :value="-1">Tous les éditeurs</option>

              <option
                v-for="(editor, i) in allEditors"
                :key="'select-editor-' + i"
                :value="editor.id"
              >{{ editor.name }}</option>
            </select>
          </div>
        </div>

        <div class="row items-center">
          <div class="col-4">
            <p class="font-bold mb-0">Mots clé</p>
          </div>

          <div class="col-8">
            <input
              v-model="filters.query"
              type="text"
              class="form-control"
              placeholder="Nom de livre, auteur, éditeur, ..."
            >
          </div>
        </div>

        <button @click="search" type="button" class="btn btn-primary float-right mt-1">Rechercher</button>
      </div>

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

      <div class="bottom-pagination row flex justify-content-start align-items-center">
        <div class="btn-group" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-primary" @click="before">Précédent</button>

          <button type="button" class="btn btn-primary" @click="next">Suivant</button>
        </div>

        <p class="ml-4 mb-0">{{ _allBooksMeta.count }} livres référencés</p>
      </div>
    </div>
  </div>
</template>

<script>
import {
  AllBooks, AllBooksMeta, AllCategories, AllAuthors, AllEditors,
} from '../queries';
import { chunkMixin } from '../mixins/chunk';
import { itemsPerRowMixin } from '../mixins/items-per-row';
import Book from '../components/Book.vue';
import Loading from '../components/Loading.vue';

export default {
  name: 'Books',

  mixins: [chunkMixin, itemsPerRowMixin],

  components: {
    Book,
    Loading,
  },

  apollo: {
    _allBooksMeta: AllBooksMeta,

    allCategories: AllCategories,

    allAuthors: AllAuthors,

    allEditors: AllEditors,

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
      first: 12,
      skip: 0,
      filters: {
        category: -1,
        author: -1,
        editor: -1,
        query: '',
      },
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

    search() {
      const params = new URLSearchParams();

      if (this.filters.query && this.filters.query.length > 0) {
        params.append('query', this.filters.query || '');
      }

      if (this.filters.category && this.filters.category > -1) {
        params.append('category', this.filters.category || -1);
      }

      if (this.filters.author && this.filters.author > -1) {
        params.append('author', this.filters.author || -1);
      }

      if (this.filters.editor && this.filters.editor > -1) {
        params.append('editor', this.filters.editor || -1);
      }

      const encodedParams = params.toString();

      this.$router.push(`/recherche?${encodedParams}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
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

  .bottom-pagination {
    margin: 0;
  }
}
</style>
