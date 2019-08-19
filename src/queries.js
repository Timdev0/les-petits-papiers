import gql from 'graphql-tag';

/**
 * Retrieve a list of all books available.
 * Make sure to build the permalink with `slug-id`.
 */
export const AllBooks = gql`
  query AllBooks {
    allBooks {
      id
      slug
      publishDate
      summary
      author {
        name
      }
      categorie {
        name
      }
      editor {
        name
      }
    }
  }
`;

/**
 * Find a book by its ID.
 */
export const Book = gql`
  query Book($id: ItemId!) {
    book(filter: {id: {eq: $id}}) {
      id
      slug
      publishDate
      summary
      author {
        name
      }
      categorie {
        name
      }
      editor {
        name
      }
    }
  }
`;

/**
 * Home model (carousel).
 */
export const Home = gql`
  query Home {
    home {
      carousel {
        id
        caption
        image {
          url
          width
          height
        }
      }
    }
  }
`;
