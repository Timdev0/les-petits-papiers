<template>
  <div id="navbar-component">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <router-link to="/" tag="a" class="navbar-brand">
        <img
          class="img-fluid img-petit-papier"
          src="../assets/images/petits-papiers-transparent.png"
          alt="les-petis-papiers"
        >
      </router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbar"
        aria-controls="navbar"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbar">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/" tag="a">Accueil</router-link>
          </li>

          <li class="nav-item">
            <router-link class="nav-link" to="/livres" tag="a">Livres</router-link>
          </li>

          <li class="nav-item">
            <router-link class="nav-link" to="/contact" tag="a">Contact</router-link>
          </li>

          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="dropdown-papiers"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >Papiers</a>

            <div class="dropdown-menu" aria-labelledby="dropdown-papiers">
              <router-link class="dropdown-item" tag="a" to="/papiers/adultes">Papiers adultes</router-link>
              <router-link class="dropdown-item" to="/papiers/ados">Papiers ados</router-link>
              <router-link class="dropdown-item" to="/papiers/enfants">Papiers enfants</router-link>
            </div>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/stationery" tag="a">Papeterie</router-link>
          </li>
        </ul>

        <div class="form-inline my-2 my-lg-0">
          <input
            v-model="query"
            @keyup.enter="search"
            class="form-control mr-sm-2"
            type="text"
            placeholder="Rechercher un livre"
          />

          <button @click="search" class="btn btn-secondary my-2 my-sm-0">Recherche</button>
        </div>

        <!-- Display links only if "href" links are loaded from the API -->
        <ul v-if="!$apollo.queries.contact.loading && contact" class="social-media list-inline">
          <li class="list-inline-item">
            <a :href="contact.facebookLink" class="social-btn" target="_blank">
              <i class="ion-logo-facebook"></i>
            </a>
          </li>

          <li class="list-inline-item">
            <a :href="contact.instagramLink" class="social-btn" target="_blank">
              <i class="ion-logo-instagram"></i>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import { Contact } from '../queries';

export default {
  name: 'navbar',

  apollo: {
    contact: Contact,
  },

  data() {
    return {
      query: '',
    };
  },

  methods: {
    /**
     * Only trigger a search if the query is not empty
     */
    search() {
      if (this.query.length > 0) {
        const encodedQuery = encodeURIComponent(this.query);

        this.$router.push(`/recherche?query=${encodedQuery}`);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .img-petit-papier{
    max-height: 40px;
  }
  ul.social-media{
    margin: unset;
    padding: none;
    list-style-type: none;
    margin-left: 1rem;
    li {
      a{
        i{
          font-size: 33px
        }
      }
    }
  }
</style>
