import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/Home.vue';
import Books from './views/Books.vue';
import Search from './views/Search.vue';
import Paper from './views/Paper.vue';

Vue.use(Router);

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,

  scrollBehavior() {
    return {
      x: 0,
      y: 0,
    };
  },

  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/livres',
      name: 'books',
      component: Books,
    },
    {
      path: '/recherche',
      name: 'search',
      component: Search,
    },
    {
      path: '/papiers/:category',
      name: 'paper',
      component: Paper,
    },
  ],
});
