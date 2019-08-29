<template>
  <div class="stationery">
    <loading v-if="$apollo.loading" :loading="$apollo.loading" :text="'Chargement en cours...'" />
    <div v-else class="stationery-container container">
      <h2>Liste des produits disponibles</h2>

      <div
        v-for="(StationeriesGroup, i) in chunk(allStationeries, itemsPerRow)"
        :key="'stationery-group-' + i"
        class="row"
      >
        <div
          v-for="(stationeryItem, e) in StationeriesGroup"
          :key="'all-stationeries-item-' + e"
          class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6 d-flex align-items-stretch"
        >
          <stationeryItem :stationeryItem="stationeryItem" class="d-flex align-items-stretch" />
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { AllStationeries } from '../queries';
import StationeryItem from '../components/StationeryItem.vue';
import { chunkMixin } from '../mixins/chunk';
import { itemsPerRowMixin } from '../mixins/items-per-row';
import Loading from '../components/Loading.vue';


export default {
  name: 'stationery',

  components: {
    Loading,
    StationeryItem,
  },

  mixins: [chunkMixin, itemsPerRowMixin],

  apollo: {
    allStationeries: AllStationeries,
  },
};
</script>

<style lang="scss" scoped>
.row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.stationery-container {
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
