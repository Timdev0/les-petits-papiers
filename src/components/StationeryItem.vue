<template>
  <div id="StationeryItem-component">
    <div class="card">
      <router-link
        tag="a"
        :to="'/stationery/' + stationeryItem.id + '-' + stationeryItem.slug"
        class="inline-block h-full align-middle"
      >
        <img
          :src="stationeryItem.image.url"
          class="card-img-top inline-block h-full align-middle"
          :alt="stationeryItem.name"
        />
      </router-link>

      <div class="card-body">
        <h5 class="card-title">{{stationeryItem.name}}</h5>

        <p class="card-text">{{stationeryItem.price}} €</p>

        <div class="tags">
          <div class="category-tag">{{ stationeryItem.categoryStationery.name }}</div>
        </div>

        <router-link
          tag="a"
          :to="'/stationery/' + stationeryItem.id + '-' + stationeryItem.slug"
          class="btn btn-primary"
        >Détails du produit</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'stationeryItem',

  props: {
    stationeryItem: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.card-body {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.tags {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 24px;

  .category-tag {
    display: inline-flex;
    margin-left: 0.5rem;
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    background-color: #4fc08d;
    color: white;
  }
}
</style>
