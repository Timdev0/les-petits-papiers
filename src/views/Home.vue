<template>
  <div class="home" v-if="!$apollo.loading">
    <div id="home-carousel" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li
          v-for="(carouselItem, index) in home.carousel"
          :key="'carousel-indicator-' + index"
          data-target="#home-carousel"
          :data-slide-to="index"
          class="active"
        />
      </ol>

      <div class="carousel-inner">
        <div
          v-for="(carouselItem, index) in home.carousel"
          :key="'carousel-item-' + index"
          class="carousel-item"
          :class="{ 'active': index === 0 }"
        >
          <img :src="carouselItem.image.url">

          <div class="carousel-caption d-md-block">
            <h5>{{ carouselItem.caption }}</h5>
            <p>{{ carouselItem.subtitle }}</p>
          </div>
        </div>

        <a class="carousel-control-prev" href="#home-carousel" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Précédent</span>
        </a>

        <a class="carousel-control-next" href="#home-carousel" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Suivant</span>
        </a>
      </div>
    </div>

    <div class="container reserve-block">
      <h2>Les réservations</h2>

      <p>{{ home.reserve }}</p>
    </div>
  </div>
</template>

<script>
import { AllBooks, Book, Home } from '../queries';

export default {
  name: 'home',

  apollo: {
    home: Home,
    allBooks: AllBooks,

    book() {
      return {
        query: Book,
        variables: {
          id: '1370262',
        },
        fetchPolicy: 'network-only',
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.carousel {
  padding-top: 24px;
  background-color: #2C3E50 !important;
}

.carousel-item img {
  display: block;
  margin: 0 auto;
  max-height: 500px;
}

.carousel-caption h5,
.carousel-caption p {
  text-shadow: -1px -1px 3px #222, 1px -1px 3px #222, -1px 1px 3px #222, 1px 1px 3px #222;
}

.carousel-caption p {
  margin: 0;
}

.reserve-block {
  padding: 16px 24px;
  margin: 32px auto;
  border-radius: 4px;
  background: #fff;

  h2 {
    font-size: 2rem;
  }

  p {
    white-space: pre-wrap;
  }
}
</style>
