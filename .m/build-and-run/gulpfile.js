const gulp = require('gulp');
const chalk = require('chalk');
const {
  runClient,
  runApi,
  runDashboard,
  runDashboardApi,
  runStorybook,
  runDocs,
} = require('./serve');
const { watchContracts } = require('./contracts');

const serve = gulp.parallel(
  runClient,
  runApi,
  runDashboard,
  runDashboardApi,
  runStorybook,
  runDocs,
  watchContracts,
);
serve.description = 'Start local development servers...';

const defaultTask = gulp.series(serve, cb => {
  console.log(chalk.yellow('\n✨🥭  Mangoes! 🥭✨\n'));

  console.log(chalk.yellow('Ganache cli running @ http://localhost:7545\n'));

  console.log(chalk.magenta('GraphQL API ready @ locahost:4000/api'));
  console.log(chalk.magenta('GraphQL explorer: ready @ locahost:4000\n'));

  console.log(chalk.green('Client app: http://localhost:3000'));
  console.log(chalk.green('Development dashboard: http://localhost:3333\n'));

  console.log(chalk.blue('Documentation: http://localhost:8080'));
  console.log(chalk.yellow('Storybook: http://localhost:9001\n'));

  cb();
});

module.exports = { serve, watchContracts };

module.exports.default = defaultTask;
