const { spawn } = require('child_process');
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
  const run = spawn('yarn dev', {
    shell: true,
    cwd: path.resolve(__dirname, '../../api'),
  });
  run.stdout.on('data', () => {
    cb();
  });
  run.stderr.on('error', err => cb(err));
  return run;
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

// const runGanache = cb => {
//   const run = spawn(
//     'node',
//     [
//       './node_modules/.bin/ganache-cli --deterministic --networkId 5777 --port 7545',
//     ],
//     {
//       shell: true,
//       cwd: path.resolve(__dirname, '../smart-contracts'),
//     },
//   );
//   let accounts = fs.createWriteStream(
//     path.resolve(__dirname, '../../accounts.txt'),
//   );
//   accounts.write('');
//   accounts.close();
//   run.stdout.on('data', data => {
//     accounts = fs.createWriteStream(
//       path.resolve(__dirname, '../../accounts.txt'),
//       { flags: 'a' },
//     );
//     accounts.write(data);
//     cb();
//   });
//   run.stderr.on('error', err => cb(err));
//   return run;
// };

module.exports = {
  runClient,
  runApi,
  runDashboard,
  runDashboardApi,
};
