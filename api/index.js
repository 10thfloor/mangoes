const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma')
const contracts = require('mangoes-smart-contracts')
const api = require('mangoes-ipfs')
const resolvers = require('./resolvers')

const NODE_ENV = process.env.NODE_ENV

require('./util/start')(
  NODE_ENV,
  new GraphQLServer({
    typeDefs: './schema.graphql',
    resolvers,
    context: ({ req }) => ({
      ...req,
      contracts: contracts(NODE_ENV),
      prisma,
      ipfs: {
        api: api(NODE_ENV)
      }
    })
  })
)
