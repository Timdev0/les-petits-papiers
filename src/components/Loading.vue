<template>
  <div id="loading-component">
    <div v-if="loading" class="loading-screen container">
      <self-building-square-spinner :animation-duration="3000" :size="50" color="#2C3E50" />

      <p>{{ text }}</p>
    </div>
  </div>
</template>

<script>
import { SelfBuildingSquareSpinner } from 'epic-spinners';

export default {
  name: 'loading',

  components: {
    SelfBuildingSquareSpinner,
  },

  props: {
    loading: {
      type: Boolean,
      required: true,
    },

    text: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.loading-screen {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 32px auto;
  padding: 24px;
  background-color: #fff;
  border-radius: 4px;

  p {
    font-size: 1.25rem;
    margin: 24px 0 0;
  }
}
</style>
