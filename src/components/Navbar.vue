<template>
  <div id="navbar-component">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <router-link to="/" tag="a" class="navbar-brand">Les Petits Papiers</router-link>

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
              <a class="dropdown-item" href="#">Papiers adultes</a>
              <a class="dropdown-item" href="#">Papiers ados</a>
              <a class="dropdown-item" href="#">Papiers enfants</a>
            </div>
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
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'navbar',

  data() {
    return {
      query: '',
    };
  },

  methods: {
    search() {
      const encodedQuery = encodeURIComponent(this.query);

      this.$router.push(`/recherche?query=${encodedQuery}`);
    },
  },
};
</script>
