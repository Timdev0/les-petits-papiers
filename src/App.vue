<template>
  <div id="app">
    <navbar />

    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  components: {
    Navbar,
  },
};
</script>

<style lang="scss">
@import '../node_modules/bootswatch/dist/flatly/variables';
@import '../node_modules/bootstrap/scss/bootstrap';
@import '../node_modules/bootswatch/dist/flatly/bootswatch';

#app {
  width: 100vw;
  height: 100vh;
  background-color: #ecf0f1;
}
</style>
