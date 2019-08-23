<template>
  <div id="paper-view">
    <loading v-if="$apollo.loading" :loading="$apollo.loading" :text="'Chargement en cours...'" />

    <div v-else class="paper-container container">
      <h2>Papiers {{category}}</h2>
    </div>
  </div>
</template>

<script>
import { Paper } from '../queries';
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
};
</script>

<style lang="scss" scoped>
.paper-container {
  margin: 32px auto;
  padding: 24px;
  background-color: #fff;
  border-radius: 4px;
}
</style>
