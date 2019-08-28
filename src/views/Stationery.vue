<template>
  <div class="stationery">
      <loading v-if="$apollo.loading" :loading="$apollo.loading" :text="'Chargement en cours...'" />
      <div v-else class="stationery-container container">
      </div>
  </div>
</template>

<script>

</script>

<style lang="scss" scoped>

</style>
