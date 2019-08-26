import gql from 'graphql-tag';

export const fragments = {
  book: gql`
    fragment book on BookRecord {
      id
      name
      summary
      publishDate
      ean13
      isbn
      available
      slug

      image {
        id
        url
      }

      author {
        id
        name
      }

      editor {
        id
        name
      }

      category {
        id
        name
      }

      collection {
        id
        name
      }
    }
  `,

  contact: gql`
    fragment contact on ContactRecord {
      address
      mail
      phoneNumber
      schedule
      instagramLink
      facebookLink
      googleMapsLink
    }
  `,
};
