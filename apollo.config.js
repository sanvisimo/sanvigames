/* eslint-env node */
// See https://www.apollographql.com/docs/devtools/apollo-config/
module.exports = {
  client: {
    service: {
      name: 'hasura',
      url: process.env.GRAPHQL_URI,
      headers: {
        'x-hasura-admin-secret': process.env.ADMIN_SECRET,
        contentType: 'application/json',
      },
    },
    // Files processed by the extension
    includes: ['src/**/*.vue', 'src/**/*.js', 'src/**/*.ts'],
  },
};
