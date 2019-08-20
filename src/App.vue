<template>
  <div id="app">
    <navbar />

    <router-view />

    <footbar />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Footbar from './components/Footbar.vue';

export default {
  components: {
    Navbar,
    Footbar,
  },
};
</script>

<style lang="scss">
@import '../node_modules/bootswatch/dist/flatly/variables';
@import '../node_modules/bootstrap/scss/bootstrap';
@import '../node_modules/bootswatch/dist/flatly/bootswatch';

html,
body {
  background-color: #ecf0f1;
}

#app {
  overflow-x: hidden;
  background-color: #ecf0f1;
}
</style>
