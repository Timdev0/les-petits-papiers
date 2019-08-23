import gql from 'graphql-tag';

import { fragments } from './fragments';

/**
 * Meta data for the AllBooks model, retrieve the length of the AllBooks array
 */
export const AllBooksMeta = gql`
  query AllBooksMeta {
    _allBooksMeta {
      count
    }
  }
`;

/**
 * Retrieve a list of all books available.
 * Make sure to build the permalink with `slug-id`.
 */
export const AllBooks = gql`
  query AllBooks($first: IntType, $skip: IntType) {
    allBooks(first: $first, skip: $skip) {
      ...book
    }
  }
  ${fragments.book}
`;

export const AllBooksSearch = gql`
  query AllBooksSearch($searchRegex: String!) {
    allBooks(
      first: 6,
      skip: 0,
      filter: {
        name: {
          matches: {
            pattern: $searchRegex,
            caseSensitive: false
          }
        }
      }
    ) {
      ...book
    }
  }
  ${fragments.book}
`;

/**
 * Find a book by its ID.
 */
export const Book = gql`
  query Book($id: ItemId!) {
    book(filter: {id: {eq: $id}}) {
      ...book
    }
  }
  ${fragments.book}
`;

/**
 * Home model (carousel).
 */
export const Home = gql`
  query Home {
    home {
      reserve
      school
      enableSchoolLists

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
        ...book
      }
    }
  }
  ${fragments.book}
`;

export const Paper = gql`
  query Paper {
    paper {
      adultsBooks {
        description
        video {
          url
        }
        existingBook {
          id
          name
          slug
          publishDate
          summary
          author {
            name
          }
          category {
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
      teensBooks {
        description
        video {
          url
        }
        existingBook {
          id
          name
          slug
          publishDate
          summary
          author {
            name
          }
          category {
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
      kidsBooks {
        description
        video {
          url
        }
        existingBook {
          id
          name
          slug
          publishDate
          summary
          author {
            name
          }
          category {
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
  }
`;
