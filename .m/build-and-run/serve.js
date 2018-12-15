const { spawn } = require('child_process');
const nodemon = require('gulp-nodemon');
const path = require('path');

const runClient = cb => {
  const run = spawn('yarn dev', {
    shell: true,
    cwd: path.resolve(__dirname, '../../www'),
  });
  run.stdout.on('data', data => {
    cb();
  });
  run.stderr.on('error', err => cb(err));
  return run;
};

const runApi = cb => {
  const stream = nodemon({
    script: path.resolve(__dirname, '../../api/index.js'),
    watch: [
      path.resolve(__dirname, '../../api/**/*.js'),
      path.resolve(__dirname, '../smart-contracts/build/*.json'),
    ],
  }).on('crash', function() {
    console.error('API server has crashed!\n');
    stream.emit('restart', 10); // restart the server in 10 seconds
  });
  cb();
};

const runDashboard = cb => {
  const run = spawn('yarn dev', {
    shell: true,
    cwd: path.resolve(__dirname, '../dev-dashboard'),
  });
  run.stdout.on('data', data => {
    cb();
  });
  run.stderr.on('error', err => cb(err));
  return run;
};

const runDashboardApi = cb => {
  const run = spawn('yarn dev', {
    shell: true,
    cwd: path.resolve(__dirname, '../dev-dashboard'),
  });
  run.stdout.on('data', data => {
    cb();
  });
  run.stderr.on('error', err => cb(err));
  return run;
};

module.exports = {
  runClient,
  runApi,
  runDashboard,
  runDashboardApi,
};
