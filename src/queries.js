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
  query AllBooksSearch($searchRegex: String!, $categoryId: ItemId, $authorId: ItemId, $editorId: ItemId) {
    allBooks(
      first: 6,
      skip: 0,
      filter: {
        name: {
          matches: {
            pattern: $searchRegex,
            caseSensitive: false
          }
        },
        OR: [
          {
            category: { eq: $categoryId }
          },
          {
            author: { eq: $authorId }
          },
          {
            editor: { eq: $editorId }
          }
        ]
      }
    ) {
      ...book
    }
  }
  ${fragments.book}
`;

export const RelatedBooks = gql`
  query RelatedBooks($authorId: ItemId) {
    allBooks(
      first: 6,
      skip: 0,
      filter: {
        author: {
          in: [$authorId]
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

export const AllCategories = gql`
  query Categories {
    allCategories {
      id
      name
    }
  }
`;

export const AllAuthors = gql`
  query Authors {
    allAuthors {
      id
      name
    }
  }
`;

export const AllEditors = gql`
  query Editors {
    allEditors {
      id
      name
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
      enableSchoolLists
      textNewBooks

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
    adultsPaper {
      id
      description

      showcasedBook {
        ...book
      }
    }

    teensPaper {
      id
      description

      showcasedBook {
        ...book
      }
    }

    kidsPaper {
      id
      description

      showcasedBook {
        ...book
      }
    }
  }
  ${fragments.book}
`;

export const Contact = gql`
  query Contact {
    contact {
      ...contact
    }
  }
  ${fragments.contact}
`;

export const AllStationeries = gql`
  query AllStationeries($first: IntType, $skip: IntType) {
    allStationeries(
      first: $first,
      skip: $skip
    ) {
      ...stationery
    }
  }
  ${fragments.stationery}
`;

export const RelatedStationeries = gql`
  query RelatedStationeries($categoryId: ItemId) {
    allStationeries(
      first: 6,
      skip: 0,
      filter: {
        categoryStationery: {
          in: [$categoryId]
        }
      }
    ) {
      ...stationery
    }
  }
  ${fragments.stationery}
`;

export const Stationery = gql`
  query Stationery($id: ItemId!) {
    stationery(
      filter: {
        id: {
          eq: $id
        }
      }
    ) {
      ...stationery
    }
  }
  ${fragments.stationery}
`;
