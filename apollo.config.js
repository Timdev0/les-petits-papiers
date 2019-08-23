const path = require('path');

const envPath = path.join(process.cwd(), '/.env.local');

require('dotenv').config({
  path: envPath,
});

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
