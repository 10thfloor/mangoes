const { GraphQLServer } = require('graphql-yoga');

const { prisma } = require('packages/prisma-api');
const contracts = require('packages/smart-contracts');
const { api, mfs } = require('packages/ipfs-service');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');

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

require('./util/start')(server, options);
