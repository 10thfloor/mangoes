const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('prisma-service');
const contracts = require('zos-service');
const { api, mfs } = require('ipfs-service');
const ping = require('./util/ping');

const typeDefs = `
  type Query {
    ${ping.query}
  }
`;

const resolvers = {
  Query: {
    ...ping.resolver,
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    ...req,
    contracts,
    prisma,
    ipfs: { api, mfs },
  }),
});

const options = {
  endpoint: '/api',
  cors: {
    credentials: true,
    origin: 'http://localhost:3000',
  },
};

require('./start')(server, options);
