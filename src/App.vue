<template>
  <div id="app">
    <navbar />

    <div class="router-view-wrapper">
      <router-view />
    </div>

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
@import "../node_modules/bootswatch/dist/flatly/variables";
@import "../node_modules/bootstrap/scss/bootstrap";
@import "../node_modules/bootswatch/dist/flatly/bootswatch";

html,
body {
  background-color: #ecf0f1;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vw;
  margin-top: 70px;
  overflow-x: hidden;
  background-color: #ecf0f1;
}

.router-view-wrapper {
  flex-grow: 1;
}
</style>
