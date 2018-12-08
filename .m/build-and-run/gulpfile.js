const gulp = require('gulp');
const { runClient, runApi, runDashboard, runDashboardApi } = require('./serve');

const serve = gulp.parallel(runClient, runApi, runDashboard, runDashboardApi);
serve.description = 'Start local development servers...';

const defaultTasks = gulp.series(serve, cb => {
  console.log('Everyting started!');
  console.log('Client app: http://localhost:3000');
  console.log('Prisma api: http://localhost:4000/api');
  console.log('Prisma GraphQL Explorer: http://localhost:4000');
  console.log('Development dashboard: http://localhost:3333');
  console.log(
    'To develop Smart contracts please launch Ganache! https://truffleframework.com/ganache',
  );
  cb();
});

module.exports = { serve };

module.exports.default = defaultTasks;
