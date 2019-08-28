<template>
  <div id="paper-view">
    <loading v-if="$apollo.loading" :loading="$apollo.loading" :text="'Chargement en cours...'" />

    <div v-else class="paper-container container">
      <h2 class="mb-4">Papiers {{category}}</h2>

      <p v-html="paper.description" class="text-base" />

      <div
        v-for="(booksGroup, i) in chunk(paper.showcasedBook, itemsPerRow)"
        :key="'books-group-' + i"
        class="row justify-content-between"
      >
        <div
          v-for="(book, e) in booksGroup"
          :key="'book-item-' + e"
          class="book-item col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6 align-items-stretch"
        >
          <book :book="book" class="mb-4" />

          <a class="btn btn-info w-full" target="_blank" :href="'mailto:' + contact.mail">Réserver</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Paper, Contact } from '../queries';
import { chunkMixin } from '../mixins/chunk';
import { itemsPerRowMixin } from '../mixins/items-per-row';
import Loading from '../components/Loading.vue';
import Book from '../components/Book.vue';

export default {
  name: 'paper',

  mixins: [chunkMixin, itemsPerRowMixin],

  components: {
    Loading,
    Book,
  },

  apollo: {
    adultsPaper: Paper,
    teensPaper: Paper,
    kidsPaper: Paper,
    contact: Contact,
  },

  data() {
    return {
      category: this.$route.params.category,
    };
  },

  computed: {
    paper() {
      if (this.category === 'enfants') {
        return this.kidsPaper;
      }

      if (this.category === 'ados') {
        return this.teensPaper;
      }

      return this.adultsPaper;
    },
  },

  watch: {
    $route(to) {
      this.category = to.params.category;
    },
  },
};
</script>

<style lang="scss" scoped>
.paper-container {
  margin: 32px auto;
  padding: 24px;
  background-color: #fff;
  border-radius: 4px;

  h2 {
    margin-bottom: 32px;
  }

  .paper-item {
    display: flex;
    flex-direction: column;

    img {
      display: inline-flex;
      margin: 0 auto 16px;
      max-height: 250px;
    }
  }
}
</style>
