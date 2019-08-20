<template>
  <div id="navbar-component">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Les petits papiers</a>

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
          <li class="nav-item active">
            <a class="nav-link" href="#">Accueil</a>
          </li>

          <li class="nav-item">
            <a class="nav-link" href="#">Livres</a>
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
            >
              Papiers
            </a>

            <div class="dropdown-menu" aria-labelledby="dropdown-papiers">
              <a class="dropdown-item" href="#">Papiers adultes</a>
              <a class="dropdown-item" href="#">Papiers ados</a>
              <a class="dropdown-item" href="#">Papiers enfants</a>
            </div>
          </li>
        </ul>

        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="text" placeholder="Rechercher un livre">
          <button class="btn btn-secondary my-2 my-sm-0" type="submit">Recherche</button>
        </form>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
};
</script>
