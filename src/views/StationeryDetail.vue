<template>
  <div id="stationery-detail-view">
    <loading v-if="$apollo.loading" :loading="$apollo.loading" :text="'Chargement en cours...'" />

  </div>
</template>

<script>
import { chunkMixin } from '../mixins/chunk';
import { smallItemsPerRowMixin } from '../mixins/small-items-per-row';

import Loading from '../components/Loading.vue';


export default {
  name: 'stationery-detail',

  mixins: [chunkMixin, smallItemsPerRowMixin],

  components: {
    Loading,
  },

};
</script>
