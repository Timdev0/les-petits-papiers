<template>
  <div id="book-component">
    <div class="card">
      <router-link
        tag="a"
        :to="'/livre/' + book.id + '-' + book.slug"
        class=""
      >
        <img :src="book.image.url" class="card-img-top" :alt="book.name" />
      </router-link>

      <div class="card-body">
        <h5 class="card-title">{{book.name}}</h5>

        <p class="card-text">{{book.author.name}}</p>

        <div class="tags">
          <div
            v-for="(category, i) in book.categorie"
            :key="'book-category-' + i"
            class="category-tag"
          >{{ category.name }}</div>
        </div>

        <router-link
          tag="a"
          :to="'/livre/' + book.id + '-' + book.slug"
          class="btn btn-primary"
        >Détails du livre</router-link>
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
