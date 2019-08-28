<template>
  <div id="book-search-filters-component" class="container">
    <div class="row items-center">
      <div class="col-4">
        <p class="font-bold mb-0">Catégorie</p>
      </div>

      <div class="col-8">
        <select v-model="filters.category" class="form-control">
          <option :value="-1">Toutes catégories</option>

          <option
            v-for="(category, i) in allCategories"
            :key="'select-category-' + i"
            :value="category.id"
          >{{ category.name }}</option>
        </select>
      </div>
    </div>

    <div class="row items-center">
      <div class="col-4">
        <p class="font-bold mb-0">Auteur</p>
      </div>

      <div class="col-8">
        <select v-model="filters.author" class="form-control">
          <option :value="-1">Tous les auteurs</option>

          <option
            v-for="(author, i) in allAuthors"
            :key="'select-author-' + i"
            :value="author.id"
          >{{ author.name }}</option>
        </select>
      </div>
    </div>

    <div class="row items-center">
      <div class="col-4">
        <p class="font-bold mb-0">Editeur</p>
      </div>

      <div class="col-8">
        <select v-model="filters.editor" class="form-control">
          <option :value="-1">Tous les éditeurs</option>

          <option
            v-for="(editor, i) in allEditors"
            :key="'select-editor-' + i"
            :value="editor.id"
          >{{ editor.name }}</option>
        </select>
      </div>
    </div>

    <div class="row items-center">
      <div class="col-4">
        <p class="font-bold mb-0">Mots clé</p>
      </div>

      <div class="col-8">
        <input
          v-model="filters.query"
          type="text"
          class="form-control"
          placeholder="Nom de livre, auteur, éditeur, ..."
        >
      </div>
    </div>

    <button @click="search" type="button" class="btn btn-primary float-right mt-1">Rechercher</button>
  </div>
</template>

<script>
import { AllCategories, AllAuthors, AllEditors } from '../queries';

export default {
  name: 'book-search-filters',

  apollo: {
    allCategories: AllCategories,

    allAuthors: AllAuthors,

    allEditors: AllEditors,
  },

  data() {
    return {
      filters: {
        category: -1,
        author: -1,
        editor: -1,
        query: '',
      },
    };
  },

  methods: {
    search() {
      const params = new URLSearchParams();

      if (this.filters.query && this.filters.query.length > 0) {
        params.append('query', this.filters.query || '');
      }

      if (this.filters.category && this.filters.category > -1) {
        params.append('category', this.filters.category || -1);
      }

      if (this.filters.author && this.filters.author > -1) {
        params.append('author', this.filters.author || -1);
      }

      if (this.filters.editor && this.filters.editor > -1) {
        params.append('editor', this.filters.editor || -1);
      }

      const encodedParams = params.toString();

      this.$router.push(`/recherche?${encodedParams}`);
    },
  },
};
</script>
