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
        url
      }

      author {
        name
      }

      editor {
        name
      }

      category {
        name
      }

      collection {
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
