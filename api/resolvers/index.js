const { resolver } = require('../util/ping');

const resolvers = {
  Query: {
    ping: resolver.ping,
  },
};

module.exports = resolvers;
