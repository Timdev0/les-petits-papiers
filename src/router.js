import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/Home.vue';
import Books from './views/Books.vue';
import BookDetail from './views/BookDetail.vue';
import Search from './views/Search.vue';
import Paper from './views/Paper.vue';
import NotFound from './views/404.vue';
import Contact from './views/Contact.vue';
import Stationery from './views/Stationery.vue';
import SationeryDetail from './views/StationeryDetail.vue';

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
    {
      path: '/livre/:id',
      name: 'book-detail',
      component: BookDetail,
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact,
    },
    {
      path: '/stationery',
      name: 'stationery',
      component: Stationery,
    },
    {
      path: '/stationery/:id',
      name: 'sationery-detail',
      component: SationeryDetail,
    },
    {
      path: '/page-introuvable',
      name: '404',
      component: NotFound,
    },
    {
      path: '*',
      redirect: '/page-introuvable',
    },
  ],
});
