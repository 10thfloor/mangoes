const gulp = require('gulp');
const chalk = require('chalk');
const { runClient, runApi, runDashboard, runDashboardApi } = require('./serve');
const { watchContracts } = require('./contracts');

const serve = gulp.parallel(runClient, runApi, runDashboard, runDashboardApi);
serve.description = 'Start local development servers...';

const defaultTask = gulp.series(serve, cb => {
  // console.log('Everyting started!');
  // console.log('Client app: http://localhost:3000');
  // console.log('Prisma api: http://localhost:4000/api');
  // console.log('Prisma GraphQL Explorer: http://localhost:4000');
  // console.log('Development dashboard: http://localhost:3333');

  console.log(chalk.yellow('\n✨🥭  Mangoes! 🥭✨\n'));
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

  cb();
});

module.exports = { serve, watchContracts };

module.exports.default = defaultTask;
