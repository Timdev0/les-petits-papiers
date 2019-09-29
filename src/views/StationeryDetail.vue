<template>
  <div id="stationery-detail-view">
    <loading v-if="$apollo.loading" :loading="$apollo.loading" :text="'Chargement en cours...'" />

    <div v-else-if="stationery" class="stationery-detail-container container">
      <div class="row">
        <div class="col-md-4">
          <img class="img-fluid rounded shadow-2xl mb-4" :src="stationery.image.url" alt="">

          <a class="btn btn-info w-full mb-4" target="_blank" :href="'mailto:' + contact.mail">Réserver</a>
        </div>

        <div class="col-md-8 order-1">
          <div class="mb-4">
            <h1 class="text-3xl mb-4">{{ stationery.name }}</h1>

            <h1 class="text-3xl mb-4">{{ stationery.price }}€</h1>

            <div v-if="stationery.description" v-html="stationery.description"></div>

            <div class="flex items-center content-center">
              <div
                class="rounded-full w-3 h-3 mr-2"
                :class="{ 'bg-green-500': stationery.available, 'bg-red-600': !stationery.available }"
              />

              <p class="mb-0 text-gray-600">
                  {{ (stationery.available) ? 'En stock, disponible aujourd\'hui' : 'Indisponible' }}
              </p>
            </div>
          </div>

          <div>
            <div class="border-b-2 border-green-600 mb-2">
              <span class="bg-green-600 text-white px-3 py-1 rounded-t">De la même catégorie</span>
            </div>

            <div
              v-for="(stationeryGroup, i) in chunk($data.allStationeries || [], itemsPerRow)"
              :key="'stationery-group-' + i"
              class="row"
            >
              <div
                v-for="(stationery, e) in stationeryGroup"
                :key="'all-stationeries-item-' + e"
                class="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-6 d-flex align-items-stretch"
              >
                <stationery-item :stationery-item="stationery" class="d-flex align-items-stretch" />
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
import { smallItemsPerRowMixin } from '../mixins/small-items-per-row';
import { Contact, Stationery, RelatedStationeries } from '../queries';
import Loading from '../components/Loading.vue';
import StationeryItemComponent from '../components/StationeryItem.vue';

export default {
  name: 'stationery-detail',

  mixins: [chunkMixin, smallItemsPerRowMixin],

  components: {
    Loading,
    StationeryItem: StationeryItemComponent,
  },

  computed: {
    /**
     * A SlugID is composed of "stationery.id-stationery.slug"
     *
     * @returns {string}
     */
    slugID() {
      return this.$route.params.id;
    },

    /**
     * Extract the ID of the stationery from the slug param
     *
     * @returns {string}
     */
    stationeryID() {
      return this.slugID.substr(0, this.slugID.indexOf('-'));
    },

    /**
     * Extract the slug name of the stationery from the slug param
     *
     * @returns {string}
     */
    slug() {
      return this.slugID.substr(this.slugID.indexOf('-') + 1, this.slugID.length);
    },
  },

  apollo: {
    contact: Contact,

    stationery() {
      return {
        query: Stationery,
        fetchPolicy: 'no-cache',

        variables: {
          id: this.stationeryID,
        },

        result() {
          if (!this.$apollo.queries.allStationeries) {
            this.$apollo.addSmartQuery('allStationeries', {
              query: RelatedStationeries,
              fetchPolicy: 'no-cache',
              variables: {
                categoryId: this.stationery.categoryStationery.id,
              },
            });
          }
        },
      };
    },
  },

  watch: {
    stationeryID(newValue) {
      this.$apollo.queries.stationery.refetch({
        id: newValue,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.stationery-detail-container {
  margin: 32px auto;
  padding: 24px;
  background-color: #fff;
  border-radius: 4px;
}
</style>
