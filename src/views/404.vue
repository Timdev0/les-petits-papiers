<template>
  <div id="404-view" class="container not-found-container">
    <div class="container">
      <!-- Page Heading/Breadcrumbs -->
      <h1>Page introuvable</h1>
      <p>La page que vous cherchez est introuvable. Voici des liens utiles.</p>
      <ul>
        <li>
          <router-link to="/">Accueil</router-link>
        </li>
        <li>
            <router-link to="/livres">Livres</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .not-found-container {
    margin: 32px auto;
    padding: 24px;
    background-color: #fff;
    border-radius: 4px;
  }
</style>
