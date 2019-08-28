export const smallItemsPerRowMixin = {
  data() {
    return {
      windowWidth: window.innerWidth,
      itemsPerRow: this.calculateItemsPerRow(),
    };
  },

  methods: {
    calculateItemsPerRow() {
      const width = window.innerWidth;

      if (width < 992) {
        return 2;
      }

      if (width < 1200) {
        return 3;
      }

      return 4;
    },
  },

  watch: {
    windowWidth() {
      this.itemsPerRow = this.calculateItemsPerRow();
    },
  },

  mounted() {
    const vueInstance = this;

    this.$nextTick(() => {
      window.addEventListener('resize', () => {
        vueInstance.windowWidth = window.innerWidth;
      });
    });
  },
};
