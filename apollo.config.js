require('dotenv').config();

module.exports = {
  client: {
    service: {
      name: 'DatoCMS',
      url: 'https://graphql.datocms.com',
      headers: {
        Authorization: `Bearer ${process.env.VUE_APP_DATOCMS}`,
      },
    },
  },
};
