const chalk = require('chalk');
module.exports = (env, server) => {
  const options = {
    endpoint: '/api',
    cors: {
      credentials: true,
      origin: 'http://localhost:3000',
    },
  };

  server.start(options, () => {
    console.log(chalk.yellow('\n✨ Server started! ✨\n'));
    console.log(chalk.magenta('GraphQL API ready @ locahost:4000/api'));
    console.log(chalk.magenta('GraphQL explorer: ready @ locahost:4000\n'));

    console.log(
      `Guide for zeit now:\n ${chalk.blue(
        'https://zeit.co/docs/v2/deployments/basics/',
      )}\n`,
    );

    console.log(
      `Guide for Next.js:\n ${chalk.blue('https://nextjs.org/docs/')}\n`,
    );

    console.log(
      `Guide for Prisma:\n ${chalk.blue('https://www.prisma.io/docs/')}\n`,
    );

    console.log(
      `Guide Open Zeppelin (ZOS):\n ${chalk.blue(
        'https://docs.zeppelinos.org/docs/start.html',
      )}\n`,
    );
    console.log(
      `Guides for IPFS:\n ${chalk.blue(
        'https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#mutable-file-system\n https://infura.io/docs',
      )}`,
    );
  });
};
