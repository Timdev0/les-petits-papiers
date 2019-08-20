<template>
  <div class="books-vue" v-if="!$apollo.loading">
    <div class="container">
      <div class="row">
        <div v-for="(allBooksItem, index) in allBooks" :key="'all-books-item-' + index">
          <div class="col-md-4">
            <div class="card" style="width: 18rem;">
              <img :src="allBooksItem.image.url" class="card-img-top" :alt="allBooksItem.image.alt">
              <div class="card-body">
                <h5 class="card-title">{{allBooksItem.name}}</h5>
                <p class="card-text">{{allBooksItem.author.name}}</p>
                <a href="#" class="btn btn-primary">Détails du livre</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { AllBooks } from '../queries';

export default {
  name: 'Books',

  apollo: {
    allBooks: AllBooks,
  },
};
</script>

<style lang="scss" scoped>
.card-img-top{
  max-height: 380px;
}
</style>
