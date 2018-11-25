const { GraphQLServer } = require('graphql-yoga');
const prisma = require('prisma-service');
const contracts = require('zos-service');
const { api, mfs } = require('ipfs-service');

const typeDefs = `
  type Query {
    hello(name: String): String!
  }
`;

const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`,
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });

const options = {
  endpoint: '/api',
  cors: {
    credentials: true,
    origin: 'http://localhost:3000',
  },
  context: ({ req }) => ({
    ...req,
    prisma,
    contracts,
    ipfs: { api, mfs },
  }),
};

require('./start')(server, options);
