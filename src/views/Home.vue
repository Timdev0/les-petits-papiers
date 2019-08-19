<template>
  <div class="home"></div>
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
