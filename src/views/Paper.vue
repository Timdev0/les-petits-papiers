<template>
  <div id="paper-view">
    <loading v-if="$apollo.loading" :loading="$apollo.loading" :text="'Chargement en cours...'" />

    <div v-else class="paper-container container">
      <h2>Papiers {{category}}</h2>

      <div
        v-for="(papersGroup, i) in chunk(iterableBooks, itemsPerRow)"
        :key="'papers-group-' + i"
        class="row justify-content-between"
      >
        <div
          v-for="(paper, e) in papersGroup"
          :key="'paper-item-' + e"
          class="paper-item col-xl-3 col-lg-4 col-md-4 col-sm-6 col-6 align-items-stretch"
        >
          <img
            :src="paper.existingBook.image.url"
            :alt="paper.existingBook.name"
            class="img-thumbnail"
          />

          <p v-html="paper.description"></p>

          <router-link
            tag="a"
            class="btn btn-info mb-4"
            :to="'/livre/' + paper.existingBook.id + '-' + paper.existingBook.slug"
          >Plus de détails</router-link>

          <a class="btn btn-info" target="_blank" :href="'mailto:' + contact.mail">Réserver</a>
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

export default {
  name: 'paper',

  mixins: [chunkMixin, itemsPerRowMixin],

  components: {
    Loading,
  },

  apollo: {
    paper: Paper,
    contact: Contact,
  },

  data() {
    return {
      category: this.$route.params.category,
    };
  },

  computed: {
    iterableBooks() {
      if (this.category === 'enfants') {
        return this.paper.kidsBooks || [];
      }

      if (this.category === 'ados') {
        return this.teensBooks || [];
      }

      return this.paper.adultsBooks || [];
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
