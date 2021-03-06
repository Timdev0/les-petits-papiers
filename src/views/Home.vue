<template>
  <div class="home">
    <loading v-if="$apollo.loading" :loading="$apollo.loading" :text="'Chargement en cours...'" />

    <div v-else>
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
            <img :src="carouselItem.image.url" :alt="carouselItem.caption" />

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

        <p v-html="home.reserve" />
      </div>

      <div class="container school-lists" v-if="home.enableSchoolLists">
        <h2>Les listes de rentrées</h2>

        <p v-html="home.school" />

        <div class="container row justify-between">
          <div
            v-for="(list, index) in home.schoolLists"
            :key="'list-' + index"
            class="flex-col flex justify-content-center align-items-center"
          >
            <a :href="list.url" class>
              <img
                :src="require('../assets/icons/xls.png')"
                alt="XLS icon"
                style="max-height: 128px;"
              />
            </a>

            <p>
              <b>{{ list.title }}</b>
            </p>
          </div>
        </div>
      </div>

      <div class="container new-books">
        <h2 class="mb-2">Nouveautés</h2>

        <div v-html="home.textNewBooks" />

        <div
          v-for="(booksGroup, index) in chunk(home.newBooks, itemsPerRow)"
          :key="'books-group-' + index"
          class="row"
        >
          <div
            v-for="(book, e) in booksGroup"
            :key="'new-book-' + e"
            class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6 d-flex align-items-stretch"
          >
            <book :book="book" class="d-flex align-items-stretch" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Home } from '../queries';
import { chunkMixin } from '../mixins/chunk';
import { itemsPerRowMixin } from '../mixins/items-per-row';
import Book from '../components/Book.vue';
import Loading from '../components/Loading.vue';

export default {
  name: 'home',

  components: {
    Book,
    Loading,
  },

  mixins: [chunkMixin, itemsPerRowMixin],

  apollo: {
    home: Home,
  },
};
</script>

<style lang="scss" scoped>
.carousel {
  padding-top: 24px;
  background-color: #2c3e50 !important;
}

.carousel-item img {
  display: block;
  margin: 0 auto;
  max-height: 500px;
}

.carousel-caption h5,
.carousel-caption p {
  text-shadow: -1px -1px 3px #222, 1px -1px 3px #222, -1px 1px 3px #222,
    1px 1px 3px #222;
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

.school-lists {
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

  a {
    margin: 0 auto;
    display: block;
  }

  img {
    max-height: 128px;
    display: block;
    margin: 0 auto;
  }

  a + p {
    text-align: center;
  }
}

.new-books {
  padding: 16px 24px;
  margin: 32px auto;
  border-radius: 4px;
  background: #fff;

  .card-body {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  h2 {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
}
</style>
