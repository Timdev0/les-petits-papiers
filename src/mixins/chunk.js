import chunk from 'lodash/chunk';

export const chunkMixin = {
  methods: {
    /**
     * @param {ArrayLike<any>[]} array array to chunk
     * @param {number} size size of the sub-array to create
     */
    chunk(array, size) {
      return chunk(array, size);
    },
  },
};
