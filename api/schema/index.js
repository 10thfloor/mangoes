const ping = require('../util/ping');

const typeDefs = `
  type Query {
    ${ping.query}
  }
`;

module.exports = typeDefs;
