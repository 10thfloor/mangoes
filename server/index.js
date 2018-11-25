const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('prisma-service');
const contracts = require('zos-service');
const { api, mfs } = require('ipfs-service');

const typeDefs = `
  type Query {
    ping(who: String): String!
  }
`;

const resolvers = {
  Query: {
    ping: async (root, { who }, { ipfs, contracts, prisma }, info) => {
      switch (who) {
        case 'ipfs':
          const { version } = await ipfs.api.version();
          return `ipfs alive, version: ${version}`;
        case 'contracts':
          return `Smart Contracts alive: ${
            contracts.ExampleContract._json.contractName
          }`;
        case 'prisma':
          return `Prisma alive, Users: ${JSON.stringify(await prisma.users())}`;
        default:
          return 'pong.';
      }
    },
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
