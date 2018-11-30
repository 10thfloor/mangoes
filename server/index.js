const { GraphQLServer } = require('graphql-yoga');

const prisma = require('prisma-service');
const contracts = require('smart-contracts-service');
const { api, mfs } = require('ipfs-service');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const NODE_ENV = process.env.NODE_ENV;

require('./util/start')(
  NODE_ENV,
  new GraphQLServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
      ...req,
      contracts: contracts(NODE_ENV),
      prisma: prisma(NODE_ENV),
      ipfs: {
        api: api(NODE_ENV),
        files: mfs(NODE_ENV),
      },
    }),
  }),
);
