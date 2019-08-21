<template>
  <div id="book-component">
    <div class="card">
      <img :src="book.image.url" class="card-img-top" :alt="book.name">

      <div class="card-body">
        <h5 class="card-title">{{book.name}}</h5>
        <p class="card-text">{{book.author.name}}</p>
        <a href="#" class="btn btn-primary">Détails du livre</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'book',

  props: {
    book: {
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
</style>
