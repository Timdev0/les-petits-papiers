<template>
  <div id="paper-view">
    <div v-if="$apollo.loading" class="loading-screen container">
      <self-building-square-spinner :animation-duration="3000" :size="50" color="#2C3E50" />

      <p>Chargement en cours...</p>
    </div>

    <div v-else class="paper-container container">
      <h2>Papiers {{category}}</h2>
    </div>
  </div>
</template>

<script>
import { SelfBuildingSquareSpinner } from 'epic-spinners';

import { Paper } from '../queries';
import { chunkMixin } from '../mixins/chunk';
import { itemsPerRowMixin } from '../mixins/items-per-row';

export default {
  name: 'paper',

  mixins: [chunkMixin, itemsPerRowMixin],

  components: {
    SelfBuildingSquareSpinner,
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
@import "../assets/scss/loading-screen";

.paper-container {
  margin: 32px auto;
  padding: 24px;
  background-color: #fff;
  border-radius: 4px;
}
</style>
