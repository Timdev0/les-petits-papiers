<template>
  <div id="book-detail-view">
    <loading v-if="$apollo.loading" :loading="$apollo.loading" :text="'Chargement en cours...'" />

    <div v-else class="book-detail-container container">
      <div class="row">
        <div class="col-md-4">
          <img class="img-fluid rounded shadow-2xl mb-4" :src="book.image.url" alt="">
        </div>

        <div class="col-md-8 order-1">
          <div class="mb-4">
            <h1 class="text-3xl mb-4">{{ book.name }}</h1>

            <h1 class="text-3xl mb-4">{{ book.author.name }}</h1>

            <h4 class="text-xl text-gray-600 mb-2">{{ book.editor.name }}</h4>

            <p v-if="book.summary">{{ book.summary }}</p>

            <div class="flex items-center content-center">
              <div
                class="rounded-full w-3 h-3 mr-2"
                :class="{ 'bg-green-500': book.available, 'bg-red-600': !book.available }"
              />

              <p class="mb-0 text-gray-600">
                  {{ (book.available) ? 'En stock, disponible aujourd\'hui' : 'Indisponible' }}
              </p>
            </div>
          </div>

          <div class="mb-4">
            <div class="border-b-2 border-green-600 mb-2">
              <span class="bg-green-600 text-white px-3 py-1 rounded-t rounded-l">Informations essentielles</span>
            </div>

            <div class="row">
              <div class="col-6 mb-2">
                <p class="font-bold mb-0">EAN13</p>
              </div>

              <div class="col-6 mb-2">
                <p class="mb-0">{{ book.ean13 }}</p>
              </div>

              <div class="col-6 mb-2">
                <p class="font-bold mb-0">ISBN</p>
              </div>

              <div class="col-6 mb-2">
                <p class="mb-0">{{ book.isbn }}</p>
              </div>

              <div class="col-6 mb-2">
                <p class="font-bold mb-0">Auteur</p>
              </div>

              <div class="col-6 mb-2">
                <p class="mb-0">{{ book.author.name }}</p>
              </div>

              <div class="col-6 mb-2">
                <p class="font-bold mb-0">Catégorie</p>
              </div>

              <div class="col-6 mb-2">
                <p class="mb-0">{{ book.category.name }}</p>
              </div>

              <div class="col-6 mb-2">
                <p class="font-bold mb-0">Editeur</p>
              </div>

              <div class="col-6 mb-2">
                <p class="mb-0">{{ book.editor.name }}</p>
              </div>

              <div class="col-6 mb-2" v-if="book.collection">
                <p class="font-bold mb-0">Collection</p>
              </div>

              <div class="col-6 mb-2" v-if="book.collection">
                <p class="mb-0">{{ book.collection.name }}</p>
              </div>
            </div>
          </div>

          <div>
            <div class="border-b-2 border-green-600 mb-2">
              <span class="bg-green-600 text-white px-3 py-1 rounded-t rounded-l">Du même auteur</span>
            </div>

            <div
              v-for="(booksGroup, i) in chunk($data.allBooks || [], itemsPerRow)"
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
      </div>
    </div>
  </div>
</template>

<script>
import { chunkMixin } from '../mixins/chunk';
import { itemsPerRowMixin } from '../mixins/items-per-row';
import { Book, RelatedBooks } from '../queries';
import BookComponent from '../components/Book.vue';
import Loading from '../components/Loading.vue';

export default {
  name: 'book-detail',

  mixins: [chunkMixin, itemsPerRowMixin],

  components: {
    Loading,
    Book: BookComponent,
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

        result() {
          if (!this.$apollo.queries.allBooks) {
            this.$apollo.addSmartQuery('allBooks', {
              query: RelatedBooks,
              fetchPolicy: 'no-cache',
              variables: {
                authorId: this.book.author.id,
              },
            });
          }
        },
      };
    },
  },

  watch: {
    bookID(newValue) {
      // const that = this;

      this.$apollo.queries.book.refetch({
        id: newValue,
      });

      // .then(() => {
      //   that.$apollo.queries.allBooks.refetch({
      //     authorId: that.book.author.id,
      //   });
      // });
    },
  },
};
</script>

<style lang="scss" scoped>
.book-detail-container {
  margin: 32px auto;
  padding: 24px;
  background-color: #fff;
  border-radius: 4px;
}
</style>
