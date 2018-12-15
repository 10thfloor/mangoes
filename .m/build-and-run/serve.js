const { spawn } = require('child_process');
const nodemon = require('nodemon');
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
  nodemon({ script: path.resolve(__dirname, '../../api/index.js') });
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
