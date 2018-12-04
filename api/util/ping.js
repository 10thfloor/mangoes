const {
  EXAMPLE_CONTRACT_ADDRESS,
  EXAMPLE_CONTRACT_PROXY_ADDRESS,
} = require('mangoes-smart-contracts-service/lib/constants');

module.exports = {
  resolver: {
    ping: async (root, { who }, { ipfs, contracts, prisma }, info) => {
      switch (who) {
        case 'ipfs':
          try {
            const { version } = await ipfs.api.version();
            return `ipfs alive, version: ${version}`;
          } catch (e) {
            return 'offline';
          }
        case 'contracts':
          try {
            const contract = contracts.ExampleContract.at(
              EXAMPLE_CONTRACT_PROXY_ADDRESS,
            );
            return `Got value: ${(await contract.x()).toString()} from: ${EXAMPLE_CONTRACT_PROXY_ADDRESS}`;
          } catch (e) {
            return 'offline';
          }

        case 'prisma':
          try {
            return `Prisma alive, Users: ${JSON.stringify(
              await prisma.users(),
            )}`;
          } catch (e) {
            return 'offline';
          }
        default:
          return 'pong.';
      }
    },
  },
  query: `ping(who: String): String!`,
};
