import gql from 'graphql-tag';

/**
 * Retrieve a list of all books available.
 * Make sure to build the permalink with `slug-id`.
 */
export const AllBooks = gql`
  query AllBooks {
    allBooks {
      id
      name
      slug
      publishDate
      summary
      image {
        url
        height
        width
        alt
      }
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
      reserve
      school

      carousel {
        id
        caption
        subtitle
        image {
          url
          width
          height
        }
      }

      schoolLists {
        url
        format
        title
      }

      newBooks {
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
        image {
          url
          width
          height
        }
      }
    }
  }
`;
